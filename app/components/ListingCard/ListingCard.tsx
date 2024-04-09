import Image from "next/image";

interface Props{
    imagePath: string;
    description: string;
    location: string;
    price: number;
}

const ListingCard = ({imagePath,description,location,price}:Props) => {
    console.log(imagePath);
    
  return (
    <div>
       {/* <Image 
       src={}
       alt="houses"
       fill 
       className="rounded-lg h-full object-cover mb-3"
        /> */}
    </div>
  )
}

export default ListingCard