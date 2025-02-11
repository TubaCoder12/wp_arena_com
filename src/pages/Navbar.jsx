import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const hello = () => {
   console.log("hiii")
  };
  
  return (
    <nav className="flex items-center justify-between bg-white shadow-md h-20 px-4 sm:px-6 md:px-12 lg:px-12">
      <div className="flex items-center space-x-4">
        <Link href="/">
          <div className="relative h-20 w-40 cursor-pointer">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Link>

        {/* Hamburger Icon for Small Screens */}
        

        {/* Links */}
        <ul className="hidden sm:hidden md:hidden lg:flex  lg:space-x-6 items-center space-x-6 text-sm  text-black">
          <li>News</li>
          <li>Tutorials</li>
          <li>Reviews</li>
          <li>Comparison</li>
          <li>Resources</li>
          <li>Collection</li>
        </ul>
      </div>

      {/* Right Section: Search and Account */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="rounded-md px-2 py-2 text-sm focus:outline-none w-[100px] sm:w-[100px] lg:w-[100px]"
          />
          <FaSearch className="absolute right-2 top-3 text-gray-600" />
        </div>

        {/* Account Button */}
        <button className="border border-black px-3 py-2 rounded font-semibold hover:bg-black hover:text-white">
          MY ACCOUNT
        </button>
        <button className="lg:hidden xl:hidden sm:flex md:flex cursor-pointer" onClick={() => alert("hiii")}>
  <FaBars />
</button>


      </div>
     
    </nav>
  );
}