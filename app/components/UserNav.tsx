import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MenuIcon, Minus } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createAirbnbHome } from "@/components/ui/action";

const UserNav = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const createHomewithId= createAirbnbHome.bind(null, {
    userId: user?.id as string
  })
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="px-2 py-2 flex gap-x-2 items-center">
            <MenuIcon className="w-6 h-6" />
            <img
              src={user?.picture ?? "images/default.png"}
              className="hidden lg:block rounded-full h-6 w-6"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          {user ? (
            <>
              <div className="flex flex-col items-start justify-start">
                <form action={createHomewithId} className="w-full">
                  <button type="submit" className="w-full text-start">
                    Airbnb your Home
                  </button>
                </form>
                <button>My Listings</button>
                <button>My Favourites</button>
                <button>My Reservations</button>
                <Minus />
                <LogoutLink className="w-full">Log Out</LogoutLink>
              </div>
            </>
          ) : (
            <>
              <DropdownMenuItem>
                <RegisterLink className="w-full">Register</RegisterLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <LoginLink className="w-full">Login</LoginLink>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default UserNav;
