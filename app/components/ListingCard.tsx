import { useCountries } from "@/app/lib/getCountries";
import { addToFavorite, DeleteFromFavorite } from "@/components/ui/action";
import Image from "next/image";
import Link from "next/link";
import {AddToFavoriteButton, DeleteFromFavoriteButton } from "./SubmitButton";

interface Props {
  imagePath: string;
  description: string;
  location: string;
  price: number;
  userId: string | undefined;
  favoriteId: string;
  isInFavoriteList: boolean;
  homeId: string
  pathName: string
}

const ListingCard = ({imagePath,description,location,price, userId, favoriteId, isInFavoriteList, homeId, pathName}:Props) => {
    const {getCountryByValue}= useCountries()
    const country= getCountryByValue(location)
  return (
    <div className="">
      <div className="mt-5 p-5 ">
        <Image
          src={`https://bmggitfywxjdkqkmtdgn.supabase.co/storage/v1/object/public/Images/${imagePath}`}
          alt="houses"
          height={200}
          width={200}
          className="rounded-lg object-cover mb-3"
        />
        {userId && (
          <div className="">
            {isInFavoriteList ? (
              <form action={DeleteFromFavorite}>
                <input type="hidden" name="favoriteId" value={favoriteId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <DeleteFromFavoriteButton />
              </form>
            ) : (
              <form action={addToFavorite}>
                <input type="hidden" name="homeId" value={homeId} />
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="pathName" value={pathName} />
                <AddToFavoriteButton />
              </form>
            )}
          </div>
        )}
      </div>
      <Link href={`/home/${homeId}`}>
        {country?.flag} {country?.label}/ {country?.region}
      </Link>
      <p className="text-muted-foreground text-sm line-clamp-2 w-[40vh]">
        {description}
      </p>
      <span className="flex items-center text-muted-foreground mt-2">
        <p className=" text-black font-medium">{price}</p>/ Night
      </span>
    </div>
  );
}

export default ListingCard