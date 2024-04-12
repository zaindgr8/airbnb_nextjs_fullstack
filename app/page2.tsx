import React, { Suspense } from "react";
import MapFilterItems from "./components/MapFilterItems";
import ShowItems from "./components/ShowItems";
import SkeletonCards from "./components/SkeletonCards";

const Home = async ({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) => {
  return (
    <div className="mx-auto px-5 lg:px-10 container">
      <MapFilterItems />
      <Suspense
        key={searchParams?.filter}
        fallback={
          <p>
            <SkeletonLoading />
          </p>
        }
      >
        {/* <ShowItems searchParams={searchParams} /> */}
      </Suspense>
    </div>
  );
};

export default Home;

function SkeletonLoading() {
  return (
    <div className="grid grid-cols-4 gap-8 mt-5">
      <SkeletonCards />
      <SkeletonCards />
      <SkeletonCards />
      <SkeletonCards />
      <SkeletonCards />
      <SkeletonCards />
      <SkeletonCards />
      <SkeletonCards />
    </div>
  );
}
