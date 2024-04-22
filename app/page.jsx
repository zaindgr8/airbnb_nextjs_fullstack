import React, { Suspense } from "react";
import MapFilterItems from "./components/MapFilterItems";
import ShowItems from "./components/ShowItems";
import SkeletonCards from "./components/SkeletonCards";
import prisma from "./lib/db";

async function getData({ searchParams, userId }) {
  const data = await prisma.home.findMany({
    where: {
      addedCategory,
      addedLocation,
      addedDescription,
      categoryName: searchParams?.filter, // Handle optional filter
      country: searchParams?.country,
      guest: searchParams?.guest,
      bathrooms: searchParams?.bathroom,
      bedrooms: searchParams?.bedrooms
    },
    select: {
      photo: true, // Explicitly include photo
      id: true,
      price: true,
      description: true,
      country: true,
      Favorite: {
        where: {
          userId,
        },
      },
    },
  });
  return data;
}

const Home = async ({
  searchParams
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
        <ShowItems searchParams={{ ...searchParams }} />
      </Suspense>
    </div>
  );
};

export default Home;

function SkeletonLoading(){
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