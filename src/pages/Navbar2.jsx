"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ServicesIcon from "../../public/services-bar-icon.png";

const ServicesBar = () => {
  const MyServicesData = [
    { id: 1, ServicesIcon: "/nav1.png", ServicesTitle: "WordPress Blog", ServicesUrl: "/posts" },
    { id: 2, ServicesIcon: "/nav2.png", ServicesTitle: "WordPress Hosting", ServicesUrl: "/Hosting" },
    { id: 3, ServicesIcon: "/nav3.png", ServicesTitle: "Pro Services", ServicesUrl: "/services" },
    { id: 4, ServicesIcon: "/nav4.png", ServicesTitle: "Wp Tutorials", ServicesUrl: "/Tutorials" },
    { id: 5, ServicesIcon: "/nav5.png", ServicesTitle: "Our Themes", ServicesUrl: "/category/themes" },
    { id: 6, ServicesIcon: "/nav7.png", ServicesTitle: "Speed Optimization", ServicesUrl: "#" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // const toggleMenu = () => {
  //   setIsMenuOpen((prev) => !prev); // Safer toggle
  // };
  const toggleMenu = () => {
   
    setIsMenuOpen((prev) => !prev);
  };
  
  return (
    <section className="relative">
      {/* Toggle Button */}
      <div
  className={`fixed top-16 left-4 z-[9999] lg:hidden bg-[#2a80b9] rounded-full p-2.5 cursor-pointer transition-transform duration-300 ${
    isMenuOpen ? "rotate-180" : ""
  }`}
  onClick={toggleMenu}
>
  <Image src={ServicesIcon} alt="Toggle Menu" width={38} height={38} />
</div>


      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
        <div className="flex flex-col gap-6 py-4 h-full text-white px-4">
          {MyServicesData.map((elem) => (
            <Link href={elem.ServicesUrl} key={elem.id} className="bg-[#2980b9] rounded-md transition duration-300 w-full">
              <div className="flex items-center px-4 py-2 border-2 border-gray-300">
                <div className="pr-6">
                  <Image src={elem.ServicesIcon} alt={elem.ServicesTitle} width={24} height={24} />
                </div>
                <div className="pl-4 border-l border-white">
                  <h3 className="font-normal text-sm uppercase">{elem.ServicesTitle}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex bg-[#2a77ab] flex-wrap justify-center gap-6 w-full items-center text-white py-4">
        {MyServicesData.map((elem) => (
          <Link href={elem.ServicesUrl} key={elem.id} className="rounded-md transition duration-300">
            <div className="flex items-center border-2 border-[#5288c1] rounded w-[271px] h-[42px] px-4 py-1.5">
              <div className="pr-4">
                <Image src={elem.ServicesIcon} alt={elem.ServicesTitle} width={20} height={20} />
              </div>
              <div className="pl-4 border-l border-[#5288c1] flex-1 text-center">
                <h3 className="font-bold text-sm uppercase">{elem.ServicesTitle}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ServicesBar;
