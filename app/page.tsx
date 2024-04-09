import React from "react";
import ListingCard from "./components/ListingCard/ListingCard";
import MapFilterItems from "./components/MapFilterItems";
import prisma from "./lib/db";

async function getData(){
  const data= await prisma.home.findMany({
    where:{
      addedCategory:true,
      addedDescription:true,
      addedLocation:true
    },
    select:{
      photo:true,
      id:true,
      price:true,
      description:true,
      country:true
    }
  })
  return data
}

const Page = async () => {
  const data= await getData()
  return <div>
    <MapFilterItems/>
    <div>
      {data.map((item)=>(
        <ListingCard key={item.id}
        description= {item.description as string}
        imagePath= {item.photo as string}
        location= {item.country as string}
        price= {item.price as number}
         />
      ))}
    </div>
  </div>;
};

export default Page;
