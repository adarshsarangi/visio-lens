import React from "react";

export const LoadingProducts = () => {
  return (
    <div className="animate-pulse">
      <div className="h-12 max-w-sm rounded-md bg-gray-200" />
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-5 xl:gap-x-8">
        <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-56" />
        <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-56" />
        <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-56" />
        <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-56" />
        <div className="aspect-h-1 aspect-w-1 lg:aspect-none w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-56" />
      </div>
    </div>
  );
};
