import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import ListingCard from "../components/ListingCard";
import NoItem from "../components/NoItem";
import prisma from "../lib/db"

async function getData(userId:string){
    const data= await prisma.favorite.findMany({
        where:{
            userId: userId
        },
        select:{
            Home:{
                select:{
                    photo:true,
                    id:true,
                    Favorite:true,
                    price:true,
                    country:true,
                    description:true
                }
            }
        }
    })
        return data;
}

const FavoriteRoute = async () => {
    const {getUser} = getKindeServerSession()
    const user=  await getUser()
    if(!user) return redirect("/")
    const data= await getData(user.id)
  return (
    <section className="w-3/5 mx-auto p-10">
      <h2 className="font-bold text-4xl">Your Favorites</h2>
      {data.length === 0 ? (
        <NoItem title="No Favorite" description="Add Favourite to see List." />
      ) : (
        <div className="grid grid-cols-3">
          {data.map((item) => (
              <ListingCard
                key={item.Home?.description as string}
                description={item.Home?.country as string}
                location={item.Home?.country as string}
                pathName="/favorites"
                homeId={item.Home?.country as string}
                imagePath={item.Home?.photo as string}
                price={item.Home?.price as number}
                userId={user.id}
                favoriteId={item.Home?.Favorite[0].id as string}
                isInFavoriteList={
                  (item.Home?.Favorite.length as number) > 0 ? true : false
                }
              />
          ))}
        </div>
      )}
    </section>
  );
}

export default FavoriteRoute

    // <div className="grid grid-cols-3">
    //       {data.map((item) => (
    //           <ListingCard
    //             key={item.Home?.description as string}
    //             description={item.Home?.country as string}
    //             location={item.Home?.country as string}
    //             pathName="/favorites"
    //             homeId={item.Home?.country as string}
    //             imagePath={item.Home?.photo as string}
    //             price={item.Home?.price as number}
    //             userId={user.id}
    //             favoriteId={item.Home?.Favorite[0].id as string}
    //             isInFavoriteList={
    //               (item.Home?.Favorite.length as number) > 0 ? true : false
    //             }
    //           />
    //       ))}
    //     </div>