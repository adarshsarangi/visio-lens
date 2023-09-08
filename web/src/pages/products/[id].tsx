import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import MainLayout from "@/layouts/main";
import { cn } from "@/lib/utils";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import React from "react";

export default function ProductPage() {
  const router = useRouter();

  const { data: product, isLoading } = api.product.getOne.useQuery(
    {
      id: router.query.id as string,
    },
    {
      enabled: router.query.id !== undefined,
    },
  );

  if (isLoading) {
    return <MainLayout>Loading...</MainLayout>;
  }

  return (
    <MainLayout>
      <div className="gap-4 py-6 sm:flex">
        <div className="relative lg:max-w-lg lg:self-end">
          <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg ">
            <img
              src={`/products/${product.id}.jpg`}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="absolute bottom-2 right-2">
            <div
              className={cn(
                buttonVariants({
                  variant: "ghost",
                }),
                "w-9 bg-white px-0 hover:cursor-pointer",
              )}
              role="button"
              onClick={() => {
                const dimensions = new Image();
                dimensions.src = `/products/${product.id}.jpg`;
                dimensions.onload = function () {
                  const params = new URLSearchParams({
                    src: dimensions.src,
                    height: dimensions.height.toString(),
                    width: dimensions.width.toString(),
                  }).toString();
                  router.push(`/search/capture?${params}`);
                };
              }}
            >
              <Icons.camera className="h-6 w-6 text-gray-500" />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <p className="text-base text-gray-500">{product.brand}</p>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">
                Rs.{product.discountedPrice}
              </span>
              <span className="text-lg text-gray-500 line-through">
                Rs.{product.actualPrice}
              </span>
              <span className="text-sm font-semibold text-green-700">
                {" "}
                {Math.floor(
                  100 - (product.discountedPrice * 100) / product.actualPrice,
                )}
                % off
              </span>
            </div>

            <div className="mt-8 text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel in
              libero dolore eligendi ab! Repellendus totam illum eius fugiat, in
              harum! Vitae voluptatem accusamus repellendus asperiores id optio
              ad pariatur?
            </div>

            <div className="mt-10">
              <Button className={cn("bg-blue-600 hover:bg-blue-700")} size="lg">
                Add to bag
              </Button>
            </div>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}
