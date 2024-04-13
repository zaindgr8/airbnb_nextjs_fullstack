import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import ListingCard from "../components/ListingCard";
import NoItem from "../components/NoItem";
import prisma from "../lib/db";

async function  getData(userId:string){
    const data= await prisma.home.findMany({
        where:{
            userId:userId,
            addedCategory:true,
            addedDescription:true,
            addedLocation:true
        },
        select:{
            id:true,
            country:true,
            photo:true,
            description:true,
            price:true,
            Favorite: {
                where:{
                    userId:userId
                },
            },
        },
        orderBy:{
            createdAT:"desc"
        }
    })
    return data
}

const MyHome = async() => {
    const {getUser}=getKindeServerSession()
    const user= await getUser()
    if(!user){
        return redirect("/")
    }
    const data= await getData(user.id)    
  return (
    <div className=" w-3/5 mx-auto p-10">
      <h2 className="text-2xl font-bold">Your Homes</h2>
      {data.length === 0 ? (
        <>
          <NoItem
            title="No Listing"
            description="No Listing in Your Home, Add to view here!"
          />
        </>
      ) : (
        <div className="grid grid-cols-3">
          {data.map((item) => (
            <ListingCard
              key={item.id}
              description={item.description as string}
              imagePath={item.photo as string}
              location={item.country as string}
              price={item.price as number}
              userId={user?.id}
              favoriteId={item.Favorite[0]?.id}
              isInFavoriteList={item.Favorite.length > 0 ? true : false}
              homeId={item.id}
              pathName="/my-home"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyHome