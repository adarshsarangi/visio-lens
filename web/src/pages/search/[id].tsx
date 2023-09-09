/* eslint-disable @typescript-eslint/no-explicit-any */
import Product from "@/components/product";
import VisualSearch from "@/components/visual-search";
import MainLayout from "@/layouts/main";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import { api } from "@/utils/api";

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
  const [ids, setIds] = useState([]);
  const [isPredicting, setIsPredicting] = useState(true);
  const { data: products, isLoading } = api.product.getAll.useQuery(
    {
      ids,
    },
    {
      enabled: ids.length > 0,
    },
  );

  const getRelatedImages = async (url: string, params: any) => {
    setIsPredicting(true);

    const blob = await (await fetch(url)).blob();
    const formData = new FormData();
    const file = new File([blob], "predict.jpg", {
      type: "image/jpeg",
    });
    formData.append("image", file);
    console.log(formData.getAll("image"));

    axios
      .post("http://localhost:8000/visual-search/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: {
          ...params,
        },
      })
      .then((res) => {
        const productIds = res.data.map((item) => item[0].slice(0, -4));
        console.log(productIds);
        setIds(productIds);
        // setProducts
      })
      .finally(() => {
        setIsPredicting(false);
      });
  };

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
            handleSearch={getRelatedImages}
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
              {isPredicting && "Predicting..."}
              {!isPredicting && isLoading && "Loading...."}
              {!isPredicting && !isLoading && (
                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                  {products.map((product) => (
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
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
