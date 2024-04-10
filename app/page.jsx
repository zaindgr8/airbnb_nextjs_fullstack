import React, { Suspense } from "react";
import { getDefaultHighWaterMark } from "stream";
import ListingCard from "./components/ListingCard/ListingCard";
import MapFilterItems from "./components/MapFilterItems";
import NoItem from "./components/NoItem";
import SkeletonCards from "./components/SkeletonCards";
import prisma from "./lib/db";

async function getData({
  searchParams,
}) {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined
    }, 
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
    },
  });
  return data;
}

const Home = async ({searchParams}) => {
  const data= await getData({searchParams: searchParams})
  return (
    <div className="mx-auto px-5 lg:px-10 container">
      <MapFilterItems />
      <Suspense key={searchParams?.filter} fallback={<p><SkeletonLoading/></p>}>
        <ShowItems searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default Home

async function ShowItems({searchParams})
{const data= await getData({searchParams:searchParams})
  return (
    <>
      {data.length === 0 ? (
        <>
        <NoItem/>
        </>
      ) : (
        <>
          <div className="gap-x-5 grid grid-cols-3 mb-5">
            {data.map((item) => (
              <ListingCard
                key={item.id}
                description={item.description}
                imagePath={item.photo}
                location={item.country}
                price={item.price}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}

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