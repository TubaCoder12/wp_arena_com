'use client';

import Image from "next/image";
import { FaTwitter, FaLinkedin, FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { PiGitlabLogo } from "react-icons/pi";
import NavLinks from "./NavLinks";


export default function Footer() {
  return (
    <footer
      className="relative bg-cover bg-center bg-no-repeat text-white py-10 mt-8"
      style={{ backgroundImage: "url('/Footer.jpg')" }}
    >
      {/* Logo and Description */}
      <div className="text-center mb-10">
        {/* Logo */}
        <div className="flex justify-center items-center mb-4">
          <Image src="/Footer-logo.png" alt="WP Arena Logo" width={250} height={250} />
        </div>

        {/* Description */}
        <p className="text-gray-300 max-w-7xl mx-auto text-sm leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
        </p>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center space-x-4 mb-8">
        {[FaFacebookF, FaXTwitter, FaLinkedin, FaInstagram, FaYoutube, PiGitlabLogo].map((Icon, index) => (
          <a key={index} href="#" className="text-white hover:bg-blue-400 border border-gray-400 rounded-full p-3">
            <Icon />
          </a>
        ))}
      </div>

      <hr className="border-gray-500 w-[1200px] mx-auto" />

      {/* Footer Links */}
      <NavLinks />

      <hr className="border-gray-500 w-[1200px] mx-auto" />

      {/* Copyright */}
      <div className="text-center text-gray-100 text-xs pt-5">
        <p>Copyright © 2024 - All Rights Reserved - WPArena is a Project of TechAbout LLC.</p>
        <p className="mt-2">We are not affiliated with Automattic or WordPress.</p>
      </div>
    </footer>
  );
}
