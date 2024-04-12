import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import NoItem from "./NoItem";
import ListingCard from "./ListingCard";
import prisma from "../lib/db";

function getData({
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
  const data = prisma.home.findMany({
    where: {
      addedCategory: true,
      addedDescription: true,
      addedLocation: true,
      ...(searchParams?.filter && { categoryName: searchParams.filter }),
    },
    select: {
      photo: true,
      id: true,
      price: true,
      description: true,
      country: true,
      Favorite: {
        where: {
          userId: userId ?? undefined,
        },
      },
    },
  });
  return data;
}

const ShowItems = async ({
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
                userId={user?.id}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default ShowItems;
