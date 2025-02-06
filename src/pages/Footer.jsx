'use client'; // Ensures client-side rendering

import Image from "next/image";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="relative bg-cover bg-center bg-no-repeat text-white py-10"
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
          ever since the 1500s.
        </p>
      </div>
      
      {/* Social Icons */}
      <div className="flex justify-center space-x-6 mb-8">
        <a href="#" className="text-gray-400 hover:text-blue-400 border border-gray-400 rounded-full p-3">
          <FaFacebook />
        </a>
        <a href="#" className="text-gray-400 hover:text-blue-200 border border-gray-400 rounded-full p-3">
          <FaTwitter />
        </a>
        <a href="#" className="text-gray-400 hover:text-blue-400 border border-gray-400 rounded-full p-3">
          <FaLinkedin />
        </a>
        <a href="#" className="text-gray-400 hover:text-pink-300 border border-gray-400 rounded-full p-3">
          <FaInstagram />
        </a>
        <a href="#" className="text-gray-400 hover:text-red-500 border border-gray-400 rounded-full p-3">
          <FaYoutube />
        </a>
      </div>

      <hr className="border-gray-500 mb-6" />

      {/* Footer Links */}
      <div className="flex justify-center space-x-4 text-gray-300 text-sm mb-8">
        {[
          "News", "Tutorials", "Reviews", "Comparison", "Resources", 
          "Collection", "Site Map", "Privacy Policy", "Terms of Service", "Contact"
        ].map((link, index) => (
          <span key={index} className="hover:text-white">
            {link}
            {index < 9 && <span className="mx-4">|</span>}
          </span>
        ))}
      </div>

      <hr className="border-gray-500" />

      {/* Copyright */}
      <div className="text-center text-gray-100 text-xs pt-3">
        <p>
          Copyright © 2024 - All Rights Reserved - WPArena is a Project of
          TechAbout LLC.
        </p>
        <p>We are not affiliated with Automattic or WordPress.</p>
      </div>
    </footer>
  );
}
