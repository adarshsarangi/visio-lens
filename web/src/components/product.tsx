/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import React from "react";

interface ProductProps {
  id: number;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  actualPrice: number;
  discountedPrice: number;
  discountPercent: string;
  brand: string;
}

export default function Product(product: ProductProps) {
  return (
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
  );
}
