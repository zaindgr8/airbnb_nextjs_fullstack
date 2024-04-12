import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/dist/types/server";
import React, { Suspense } from "react";
import ListingCard from "./components/ListingCard";
import MapFilterItems from "./components/MapFilterItems";
import NoItem from "./components/NoItem";
import SkeletonCards from "./components/SkeletonCards";
import prisma from "./lib/db";

async function getData({
  searchParams,
  userId,
}: {
  userId: string | undefined;
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
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
        {/* <ShowItems /> */}
      </Suspense>
    </div>
  );
};

export default Home;

async function ShowItems({
  searchParams,
}: {
  searchParams?: {
    filter?: string;
    country?: string;
    guest?: string;
    room?: string;
    bathroom?: string;
  };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData({
    searchParams: searchParams,
    userId: user?.id,
  });

  return (
    <>
      {data.length === 0 ? (
        <>
          <NoItem />
        </>
      ) : (
        <>
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
        </>
      )}
    </>
  );
}

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
