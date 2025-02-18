import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
  };

  return (
    <nav className="flex items-center justify-between bg-white shadow-md h-20 px-4 sm:px-6 md:px-12 lg:px-12 relative">
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
        <ul className="hidden lg:flex lg:space-x-6 lg:ml-8 text-black text-lg">
          {[
            { name: "News", path: "/News" },
            { name: "Reviews", path: "/Reviews" },
            { name: "Comparison", path: "/comparison" },
            { name: "Resources", path: "/resources" },
            { name: "Collection", path: "/collection" },
            { name: "Tutorials", path: "/tutorials" },
          ].map((item, index) => (
            <li
              key={index}
              className="hover:text-blue-500 transition duration-300 ease-in-out cursor-pointer"
            >
              <Link href={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section: Search and Account */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative">
  <input
    type="text"
    placeholder="Search"
    className={`rounded-md px-2 py-2 text-sm focus:outline-none transition-all duration-300 ease-in-out
      w-[150px] sm:w-[100px] md:w-[100px] lg:w-[100px] 
      ${isSearchFocused ? "lg:w-[300px]" : ""}
    `}
    onFocus={handleSearchFocus}
    onBlur={handleSearchBlur}
  />
  <FaSearch className="absolute right-2 top-3 text-gray-600" />
</div>



         

        {/* Account Button */}
        <button className="border border-black px-3 py-2 rounded font-semibold hover:bg-black hover:text-white">
          MY ACCOUNT
        </button>

        <div
          className="lg:hidden xl:hidden sm:flex md:flex cursor-pointer"
          onClick={handleMenuToggle}
        >
          {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </div>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={handleMenuToggle}></div>
      )}

      {/* Menu with Blue Layer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-[#214760] shadow-md z-50 transform ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out`}
        style={{ clipPath: "polygon(0 0, 60% 0, 100% 100%, 0% 100%)" }} // 🔹 Blue Layer Adjusted
      >
        {/* White Layer (Matching the Blue Shape) */}
        <div
          className="absolute top-0 left-0 h-full w-full bg-white z-40"
          style={{
            clipPath: "polygon(0 0, 60% 0, 80% 100%, 0% 100%)", // 🔹 White Layer Adjusted
          }}
        ></div>

        {/* Logo Inside Sidebar */}
        <div className="relative h-20 w-40 ml-6 cursor-pointer z-50">
          <Image
            src="/logo.png"
            alt="Logo"
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Navigation Links */}
        <ul className="relative p-6 mt-40 space-y-4 text-black text-lg z-50">
          {["News", "Reviews", "Comparison", "Resources", "Collection", "Tutorials"].map((item) => (
            <li
              key={item}
              className="font-bold hover:text-blue-500 hover:translate-x-2 transition duration-300 ease-in-out"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
