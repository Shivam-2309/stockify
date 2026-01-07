import Image from "next/image";
import Link from "next/link";
import NavItems from "@/components/NavItems"
import UserDropdown from "./UserDropdown";

const Header = ({ user } : any) => {
  return (  
    <header className='sticky top-0 header'>
      <div className='container header-wrapper'>
        <Link href = "/">
          <Image src="/assets/icons/logo.svg" alt="seeStock Logo" width={140} height={32} className="h-8 w-auto cursor-pointer"></Image>
        </Link>
        {/* only shown on small devices where it would be a block */}
        <nav className="hidden sm:block">
          {/* Nav Items */}
          <NavItems />
        </nav>
          <UserDropdown
            user = {user}
          />
      </div>
    </header>
  )
}

export default Header