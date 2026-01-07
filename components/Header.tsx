import Image from "next/image";
import Link from "next/link";
import NavItems from "@/components/NavItems"
import UserDropdown from "./UserDropdown";

const Header = ({ user }: any) => {
  return (  
    <header className='sticky top-0 header'>
      <div className='container header-wrapper'>
        {/* Logo + Text side by side */}
        <Link href="/" className="flex items-center gap-2 hover:-translate-y-0.5 transition-all duration-300">
          <Image 
            src="/assets/icons/logo.png" 
            alt="seeStock Logo" 
            width={140} 
            height={32} 
            className="h-8 w-auto"
          />
          <div className="text-white font-bold text-lg bg-clip-text shadow-md ml-1">
            seeStock
          </div>
        </Link>

        {/* only shown on small devices where it would be a block */}
        <nav className="hidden sm:block">
          {/* Nav Items */}
          <NavItems />
        </nav>
        
        <UserDropdown user={user} />
      </div>
    </header>
  )
}

export default Header
