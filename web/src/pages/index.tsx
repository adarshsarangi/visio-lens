import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";
import MainLayout from "@/layouts/main";
import { siteConfig } from "@/config/site";

const products = [
  {
    id: 1,
    name: "Front of men's Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    actualPrice: 540,
    discountedPrice: 400,
    discountPercent: "20%",
    brand: "Wrangler",
  },
  {
    id: 2,
    name: "Front of men's Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    actualPrice: 540,
    discountedPrice: 400,
    discountPercent: "20%",
    brand: "Wrangler",
  },
  {
    id: 2,
    name: "Front of men's Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    actualPrice: 540,
    discountedPrice: 400,
    discountPercent: "20%",
    brand: "Wrangler",
  },
  {
    id: 3,
    name: "Front of men's Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    actualPrice: 540,
    discountedPrice: 400,
    discountPercent: "20%",
    brand: "Wrangler",
  },
  {
    id: 4,
    name: "Front of men's Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    actualPrice: 540,
    discountedPrice: 400,
    discountPercent: "20%",
    brand: "Wrangler",
  },
  {
    id: 5,
    name: "Front of men's Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    actualPrice: 540,
    discountedPrice: 400,
    discountPercent: "20%",
    brand: "Wrangler",
  },
  {
    id: 6,
    name: "Front of men's Basic Tee",
    href: "#",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    actualPrice: 540,
    discountedPrice: 400,
    discountPercent: "20%",
    brand: "Wrangler",
  },
  // More products...
];

export default function Home() {
  return (
    <>
      <Head>
        <title>{siteConfig.name}</title>
        <meta name="description" content={siteConfig.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout>
        <div className="py-14">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Trending products
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-5 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-56">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <p className="mt-1 text-sm font-semibold text-gray-800">
                      {product.brand}
                    </p>
                    <h3 className="text-sm text-gray-700">
                      <Link href={`products/${product.id}`}>
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </Link>
                    </h3>
                    <div className="space-x-2">
                      <span className="text-sm font-semibold">
                        Rs.{product.discountedPrice}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        Rs.{product.actualPrice}
                      </span>
                      <span className="text-xs font-semibold text-green-700">
                        {" "}
                        {product.discountPercent} off
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
