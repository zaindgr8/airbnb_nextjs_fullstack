import CategoryShowcase from "@/app/components/CategoryShowcase";
import { HomeMap } from "@/app/components/HomeMap";
import SelectCalendar from "@/app/components/SelectCalendar";
import { ReservationSubmitButton } from "@/app/components/SubmitButton";
import prisma from "@/app/lib/db"
import { useCountries } from "@/app/lib/getCountries";
import { createReservation } from "@/components/ui/action";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";

async function getData(homeId:string){
 const data = await prisma.home.findUnique({
   where: {
     id: homeId,
   },
   select: {
     photo: true,
     description: true,
     guests: true,
     bedrooms: true,
     title: true,
     categoryName: true,
     price: true,
     country:true,
    bathrooms:true,
    Reservation:{
      where:{
        homeId:homeId
      }
    },
    User:{
      select:{
        profileImage:true,
        firstName:true
      }
    }
   },
 });
 return data;
}

const HomeRoute = async ({ params }: { params: { id: string } }) => {  
  const data = await getData(params.id);
  const {getCountryByValue}= useCountries()
  const country = getCountryByValue(data?.country as string)
  const {getUser}= getKindeServerSession()
  const user= await getUser()
  
  return (
    <div className="w-3/5 mx-auto p-10">
      <h2 className="text-2xl font-bold"> Welcome to Home Route!</h2>
      <h3>{data?.title}</h3>
      <Image
        className="rounded-xl"
        width={350}
        height={350}
        alt="Home Image"
        src={`https://bmggitfywxjdkqkmtdgn.supabase.co/storage/v1/object/public/Images/${data?.photo}`}
      />
      <div>
        {country?.flag} {country?.label} / {country?.region}
      </div>
      <div>
        {data?.guests} Guests * {data?.bedrooms} Bedrooms * {data?.bathrooms}{" "}
        Bathrooms
      </div>
      <div>
        <img
          className="rounded-full h-11 w-11"
          src={data?.User?.profileImage ?? "/images/default.png"}
        />
        <h1>Hosted by {data?.User?.firstName}</h1>
      </div>
      <Separator className="my-12" />
      <CategoryShowcase categoryName={data?.categoryName as string} />
      <div className="flex items-center gap-x-3 py-5">
        <p className="mt-5 mb-5">{data?.description as string}</p>
        <form action={createReservation}>
          <input type="hidden" name="homeId" value={params.id} />
          <input type="hidden" name="userId" value={user?.id} />
          <SelectCalendar reservation={data?.Reservation} />
          {user?.id ? (
            <>
              <ReservationSubmitButton/>
            </>
          ) : (
            <>
              <Button className="mt-5">
                <Link className="" href="/api/auth/login">
                  Make A Reservation
                </Link>
              </Button>
            </>
          )}
        </form>
      </div>
      <HomeMap locationValue={country?.value as string} />
    </div>
  );
};

export default HomeRoute