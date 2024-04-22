import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { redirect } from 'next/navigation';
import ListingCard from '../components/ListingCard';
import NoItem from '../components/NoItem';
import prisma from '../lib/db';

async function getData(userId:string) {
    const data= await prisma.reservation.findMany({
        where:{
            userId: userId
        },
        select:{
            Home:{
                select:{
                    id:true,
                    country:true,
                    photo:true,
                    description:true,
                    price:true,
                    Favorite:{
                        where:{
                            userId:userId
                        }
                    }
                }
            }
        }
    })
    return data
}

const ReservationsRoute = async () => {
     const { getUser } = getKindeServerSession()
     const user = await getUser();
     if (!user?.id) return redirect("/")
     const data= await getData(user?.id)
  return (
    <div>
      <section className="w-3/5 mx-auto p-10">
        <h2 className="font-bold text-4xl">Your Reservations!</h2>
        {data.length === 0 ? (
          <NoItem
            title="No Reservations"
            description="Add Reservations to see List."
          />
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
                favoriteId={item.Home?.Favorite[0]?.id as string}
                isInFavoriteList={
                  (item.Home?.Favorite.length as number) > 0 ? true : false
                }
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ReservationsRoute