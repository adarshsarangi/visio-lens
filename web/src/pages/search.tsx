import Product from "@/components/product";
import VisualSearch from "@/components/visual-search";
import MainLayout from "@/layouts/main";

const dots = [
  {
    width: 245,
    height: 260,
    x: 295,
    y: 280,
  },
  {
    width: 187,
    height: 393,
    x: 279,
    y: 587,
  },
];

const image = {
  name: "Test",
  src: "https://i.pinimg.com/564x/19/bc/de/19bcdea949b3046430f3dc659733f06d.jpg",
  width: 564,
  height: 846,
};

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
  {
    id: 7,
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
    id: 8,
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

export default function SearchPage() {
  return (
    <MainLayout>
      <div className="py-12">
        <div className="relative">
          <VisualSearch image={image} dots={dots} />
          <div
            className="absolute"
            style={{
              top: 0,
              marginLeft: image.width,
            }}
          >
            <div className="pl-6">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Search results
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <Product key={product.id} {...product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
