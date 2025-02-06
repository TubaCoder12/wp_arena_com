import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link"; // Import Next.js Link component

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white shadow-md h-20 px-4 sm:px-6 md:px-10 lg:px-24">
      {/* Left Section: Logo and Links */}
      <div className="flex items-center space-x-4">
        {/* Logo with Link */}
        <Link href="/">
          <div className="relative h-16 w-16 sm:h-40 sm:w-40 lg:h-40 lg:w-40 md:h-40 md:w-40 cursor-pointer">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              style={{ objectFit: "contain" }}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </Link>

        {/* Links */}
        <ul className="hidden md:flex items-center space-x-6 text-sm font-medium text-black">
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
      </div>
    </nav>
  );
}
