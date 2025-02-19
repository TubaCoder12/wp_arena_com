"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ServicesIcon from "../../public/services-bar-icon.png";

const ServicesBar = () => {
  const MyServicesData = [
    { id: 1, ServicesIcon: "/nav1.png", ServicesTitle: "WordPress Blog", ServicesUrl: "/WordpressBlog" },
    { id: 2, ServicesIcon: "/nav2.png", ServicesTitle: "WordPress Hosting", ServicesUrl: "/Hosting" },
    { id: 3, ServicesIcon: "/nav3.png", ServicesTitle: "Pro Services", ServicesUrl: "/ProService" },
    { id: 4, ServicesIcon: "/nav4.png", ServicesTitle: "Wp Tutorials", ServicesUrl: "/Tutorials" },
    { id: 5, ServicesIcon: "/nav5.png", ServicesTitle: "Our Themes", ServicesUrl: "/Themes" },
    { id: 6, ServicesIcon: "/nav7.png", ServicesTitle: "Speed Optimization", ServicesUrl: "#" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <section className="relative z-20">


      <div
  className={`fixed top-20 ${
    isMenuOpen ? "left-[290px]" : "left-4"
  } z-[9999] lg:hidden bg-[#2a80b9] rounded-full p-2.5 cursor-pointer transition-transform duration-300 ${
    isMenuOpen ? "rotate-180" : ""
  }`}
  onClick={toggleMenu}
>
  <Image src={ServicesIcon} alt="Toggle Menu" width={38} height={38} />
</div>


      <div
        className={`fixed top-0 left-0 h-full w-[300px] bg-white shadow-lg z-40 transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } lg:hidden`}
      >
         <div className="p-6">
          <Image src="/logo.png" alt="Logo" width={120} height={50} />
        </div>
        <div className="flex flex-col gap-6 py-4 h-full text-white px-4">
         
           
          {MyServicesData.map((elem) => (
            <Link
              href={elem.ServicesUrl}
              key={elem.id}
              className="group bg-[#2980b9] rounded-md overflow-hidden transition duration-300 w-full"
            >
              <div className="flex items-center px-4 py-2 border-2 border-gray-300 relative group-hover:bg-black transition duration-500 ease-out lg:hidden">
                <div className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                <div className="pr-6 relative z-10">
                  <Image src={elem.ServicesIcon} alt={elem.ServicesTitle} width={24} height={24} />
                </div>
                <div className="pl-4 border-l border-white relative z-10 group-hover:border-blue-600">
                  <h3 className="font-normal text-sm uppercase text-white transition duration-300">
                    {elem.ServicesTitle}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
       
      </div>



      <div className="hidden lg:flex bg-[#2980b9] flex-wrap justify-center gap-4 w-full items-center text-white py-4">
       
        
        {MyServicesData.map((elem) => (
          <Link
            href={elem.ServicesUrl}
            key={elem.id}
            className="group rounded-md overflow-hidden transition duration-300"
          >
            <div className="flex items-center border-[2px] border-[#6ba6cf] bg-[#2a78ab] rounded w-[271px] h-[42px] px-4 py-1.5 relative">
              <div className="absolute inset-0 bg-black transform -translate-x-full transition-transform duration-500 ease-out lg:hidden"></div>
              <div className="pr-4 relative z-10">
                <Image src={elem.ServicesIcon} alt={elem.ServicesTitle} width={20} height={20} />
              </div>
              <div className="pl-4 border-l border-[#5087c0] relative z-10 flex-1 text-center ">
                <h3 className="font-bold text-sm uppercase text-white transition duration-300">
                  {elem.ServicesTitle}
                </h3>
               
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ServicesBar; 
