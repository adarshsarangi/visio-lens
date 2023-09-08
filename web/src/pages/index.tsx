import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";
import MainLayout from "@/layouts/main";
import { siteConfig } from "@/config/site";
import Product from "@/components/product";

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
              <Product key={product.id} {...product} />
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
