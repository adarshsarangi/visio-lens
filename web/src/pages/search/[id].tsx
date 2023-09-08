/* eslint-disable @typescript-eslint/no-explicit-any */
import Product from "@/components/product";
import VisualSearch from "@/components/visual-search";
import MainLayout from "@/layouts/main";
import { useRouter } from "next/router";

const dots = [
  // {
  //   width: 245,
  //   height: 260,
  //   x: 295,
  //   y: 280,
  // },
  // {
  //   width: 187,
  //   height: 393,
  //   x: 279,
  //   y: 587,
  // },
];

const image = {
  name: "Test",
  src: "https://i.pinimg.com/564x/19/bc/de/19bcdea949b3046430f3dc659733f06d.jpg",
  width: 564,
  height: 846,
};

export default function SearchPage() {
  const { query } = useRouter();
  const { src, height, width } = query;

  if (!src || typeof src !== "string") {
    return <div>No src</div>;
  }

  if (!height || typeof height !== "string") {
    return <div>No height</div>;
  }

  if (!width || typeof width !== "string") {
    return <div>No width</div>;
  }

  return <SearchPageContent height={height} width={width} src={src} />;
}

interface SearchPageContentProps {
  src: string;
  height: string;
  width: string;
}

function SearchPageContent({ src, height, width }: SearchPageContentProps) {
  return (
    <MainLayout>
      <div className="py-12">
        <div className="relative">
          <VisualSearch
            image={{
              name: "Capture",
              src,
              height: Number(height),
              width: Number(width),
            }}
            dots={dots}
          />
          <div
            className="absolute"
            style={{
              top: 0,
              marginLeft: `${Number(width)}px`,
            }}
          >
            <div className="pl-6">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Search results
              </h2>
              {/* <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <Product key={product.id} {...product} />
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
