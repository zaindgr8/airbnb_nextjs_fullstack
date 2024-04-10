import { useCountries } from "@/app/lib/getCountries";
import Image from "next/image";
import Link from "next/link";

interface Props{
    imagePath: string;
    description: string;
    location: string;
    price: number;
}

const ListingCard = ({imagePath,description,location,price}:Props) => {
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
          className="rounded-lg object-cover mb-3 "
        />
      </div>
      <Link href="/">
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