import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";
import InfiniteScroll from "react-infinite-scroll-component";
import MainLayout from "@/layouts/main";
import { siteConfig } from "@/config/site";
import Product from "@/components/product";
import { LoadingProducts } from "@/components/skeleton";
import type { Product as IProduct } from "@prisma/client";

type InfiniteProductListProps = {
  isLoading: boolean;
  isError: boolean;
  hasMore: boolean | undefined;
  fetchNewProducts: () => Promise<unknown>;
  products?: IProduct[];
};

export function InfiniteProductList({
  products: tweets,
  isError,
  isLoading,
  fetchNewProducts,
  hasMore = false,
}: InfiniteProductListProps) {
  if (isLoading) return <LoadingProducts />;
  if (isError) return <h1>Error...</h1>;

  if (tweets == null || tweets.length === 0) {
    return (
      <h2 className="my-4 text-center text-2xl text-gray-500">No Tweets</h2>
    );
  }

  return (
    <ul>
      <h2 className="text-2xl font-bold tracking-tight text-gray-900">
        All products
      </h2>
      <InfiniteScroll
        dataLength={tweets.length}
        next={fetchNewProducts}
        hasMore={hasMore}
        loader={<LoadingProducts />}
      >
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-5 xl:gap-x-8">
          {tweets.map((product) => {
            return (
              <Product
                key={product.id}
                actualPrice={product.actualPrice}
                discountedPrice={product.discountedPrice}
                href="/"
                id={product.id}
                imageSrc={`/products/${product.id}.jpg`}
                brand={product.brand}
                name={product.name}
              />
            );
          })}
        </div>
      </InfiniteScroll>
    </ul>
  );
}
export default function Home() {
  const products = api.product.getInfinite.useInfiniteQuery(
    {},
    { getNextPageParam: (lastPage) => lastPage.nextCursor },
  );

  return (
    <>
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <div className="py-14">
          <InfiniteProductList
            products={products.data?.pages.flatMap((page) => page.items)}
            isError={products.isError}
            isLoading={products.isLoading}
            hasMore={products.hasNextPage}
            fetchNewProducts={products.fetchNextPage}
          />
        </div>
      </MainLayout>
    </>
  );
}
