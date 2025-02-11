import React from "react";
import Link from "next/link";
import { FaFacebook, FaPinterest, FaWhatsapp, FaLinkedin, FaReddit, FaTelegram, FaLink } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";

const ServiceSocial = ({ slug }) => {
  // **Social Share Logic**
  const url = encodeURIComponent(`https://stg-wparena-staging.kinsta.cloud/service/${slug}`);

  const handleShare = (platform) => {
    let shareUrl = "";
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case "pinterest":
        shareUrl = `https://pinterest.com/pin/create/button/?url=${url}`;
        break;
      case "whatsapp":
        shareUrl = `https://api.whatsapp.com/send?text=${url}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case "reddit":
        shareUrl = `https://www.reddit.com/submit?url=${url}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${url}`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        
        return;
      default:
        return;
    }
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-white pt-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
        {/* Left Section - Home Button */}
        <div>
          <Link href="/">
            <button className="flex text-blue-600 font-semibold text-lg hover:underline">
              <IoIosHome className="mt-1" /> Home
            </button>
          </Link>
        </div>

        {/* Right Section - Share Icons */}
        <div className="flex items-center gap-4">
          <span className="text-blue-600 font-semibold cursor-pointer hover:underline">Share</span>
          <div className="flex items-center space-x-3">
            <FaFacebook onClick={() => handleShare("facebook")} className="text-blue-700 text-3xl hover:scale-110 cursor-pointer" />
            <FaPinterest onClick={() => handleShare("pinterest")} className="text-red-600 text-3xl hover:scale-110 cursor-pointer" />
            <FaWhatsapp onClick={() => handleShare("whatsapp")} className="text-green-500 text-3xl hover:scale-110 cursor-pointer" />
            <FaLinkedin onClick={() => handleShare("linkedin")} className="text-blue-500 text-3xl hover:scale-110 cursor-pointer" />
            <FaReddit onClick={() => handleShare("reddit")} className="text-orange-500 text-3xl hover:scale-110 cursor-pointer" />
            <FaTelegram onClick={() => handleShare("telegram")} className="text-blue-400 text-3xl hover:scale-110 cursor-pointer" />
            <FaLink onClick={() => handleShare("copy")} className="text-black text-3xl hover:scale-110 cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSocial;
