import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const productRouter = createTRPCRouter({
  getInfinite: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(), // <-- "cursor" needs to exist, but can be any type
      }),
    )
    .query(async (opts) => {
      const { input, ctx } = opts;
      const limit = input.limit ?? 50;
      const { cursor } = input;
      const items = await ctx.prisma.product.findMany({
        take: limit + 1, // get an extra item at the end which we'll use as next cursor
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          id: "asc",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop();
        nextCursor = nextItem!.id;
      }
      return {
        items,
        nextCursor,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany();
  }),

  getOne: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.product.findFirst({
        where: {
          id: input.id,
        },
      });
    }),
});
