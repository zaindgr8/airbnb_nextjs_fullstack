import React from "react";
import { getDefaultHighWaterMark } from "stream";
import ListingCard from "./components/ListingCard/ListingCard";
import MapFilterItems from "./components/MapFilterItems";
import prisma from "./lib/db";

async function getData({
  searchParams,
}: {
  searchParams?: { filter?: string };
}) {
  const data = await prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      categoryName: searchParams?.filter ?? undefined,
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

// const Home = async ({searchParams}:{searchParams?:{filter?:string}}) => {
//   const data= await getData({searchParams: searchParams})
//   return (
//     <div className="mx-auto px-5 lg:px-10 container">
//       <MapFilterItems />
//       <ShowItems/>
//     </div>
//   );
// };

// export default Home

export default async function Home({
  searchParams,
}: {
  searchParams?: { filter?: string };
}) {
  const data = await getData({ searchParams: searchParams });
  return (
    <div>
      <MapFilterItems />
      {/* <ShowItems /> */}
    </div>
  );
}

async function ShowItems({
  searchParams,
}: {
  searchParams?: { filter?: string };
}) {
  const data = await getData({ searchParams: searchParams });
  return (
    <div className="gap-x-5 grid grid-cols-3 mb-5">
      {data.map((item) => (
        <ListingCard
          key={item.id}
          description={item.description as string}
          imagePath={item.photo as string}
          location={item.country as string}
          price={item.price as number}
        />
      ))}
    </div>
  );
}
