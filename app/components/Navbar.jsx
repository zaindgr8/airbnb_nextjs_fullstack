import Image from "next/image";
import Link from "next/link";
import UserNav from "./UserNav.tsx";

const Navbar = () => {
  return (
    <nav className="w-full border-b flex items-center justify-between px-5">
      <div className="flex items-center">
        <Link href="/" className="flex items-center py-3 px-3">
          <Image
            height={70}
            width={70}
            className="hidden lg:block"
            alt="image"
            src="/images/airbnbd.png"
          />
          <Image
            height={50}
            width={50}
            alt="image"
            className="lg:hidden block"
            src="/images/airbnbm.png"
          />
        </Link>
      </div>
      <div className="lg:flex items-center">
        <div className="lg:ml-4 rounded-xl border-2 p-1">
          Hello from the Search
        </div>
      </div>
      <div className="p-1 rounded-lg border-2 ">
        <UserNav />
      </div>
    </nav>
  );
};

export default Navbar;
