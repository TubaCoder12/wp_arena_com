'use client'; // Ensures client-side rendering

import Image from "next/image";
import {  FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PiGitlabLogo } from "react-icons/pi";
export default function Footer() {
  return (
    <footer
      className="relative bg-cover bg-center bg-no-repeat text-white py-10 mt-8"
      style={{ backgroundImage: "url('/Footer.jpg')" }}
    >
      {/* Logo and Description */}
      <div className="text-center mb-8">
        {/* Logo */}
        <div className="flex justify-center items-center mb-4">
          <div className="w-12 h-12 flex justify-center items-center rounded-full bg-blue-600">
            <Image src="/footerlogo.png" alt="WP Arena Logo" width={50} height={50} />
          </div>
          <h2 className="ml-3 text-3xl font-semibold">WP ARENA</h2>
        </div>
        {/* Description */}
        <p className="text-gray-300 max-w-7xl mx-auto text-sm leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500s.Lorem Ipsum has been the industry's standard dummy text
          ever since the 1500sLorem Ipsum has been the industry's standard dummy text
        
        </p>
      </div>
      
      {/* Social Icons */}
      <div className="flex justify-center space-x-4 mb-8">
        <a href="#" className="text-white hover:bg-blue-400 border border-gray-400 rounded-full p-3">
          <FaFacebookF />
        </a>
        <a href="#" className="text-white hover:bg-blue-400 border border-gray-400 rounded-full p-3">
          <FaXTwitter />
        </a>
        <a href="#" className="text-white hover:bg-blue-400 border border-gray-400 rounded-full p-3">
          <FaLinkedin />
        </a>
        <a href="#" className="text-white  hover:bg-blue-400 border border-gray-400 rounded-full p-3">
          <FaInstagram />
        </a>
        <a href="#" className="text-white  hover:bg-blue-400 border border-gray-400 rounded-full p-3">
          <FaYoutube />

        </a>
        <a href="#" className="text-white  hover:bg-blue-400 border border-gray-400 rounded-full p-3">
          <PiGitlabLogo />
        </a>
      </div>

      <hr className="border-gray-500 w-[1200px] mx-auto  " />

      {/* Footer Links */}
      <div className="flex justify-center text-gray-300 text-sm my-4 flex-wrap gap-x-4 gap-y-2 md:gap-y-0 ">
  {[
    "News", "Tutorials", "Reviews", "Comparison", "Resources",
    "Collection", "Site Map", "Privacy Policy", "Terms of Service", "Contact"
  ].map((link, index) => (
    <span key={index} className="hover:text-white flex items-center font-semibold">
      {link}
      {index < 9 && <span className="hidden md:inline mx-4">|</span>}
    </span>
  ))}
</div>


      <hr className="border-gray-500 w-[1200px] mx-auto " />

      {/* Copyright */}
      <div className="text-center text-gray-100 text-xs pt-5">
        <p>
          Copyright © 2024 - All Rights Reserved - WPArena is a Project of
          TechAbout LLC.
        </p>
        <p className="mt-2">We are not affiliated with Automattic or WordPress.</p>
      </div>
    </footer>
  );
}
