import { useState } from "react";
import { FaFacebookF, FaTwitter, FaPinterestP, FaWhatsapp, FaLinkedinIn, FaRedditAlien, FaPlus } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { RiTelegramFill, RiSubtractFill } from "react-icons/ri";
import { BsTwitterX } from "react-icons/bs";
import { FaLink } from "react-icons/fa";

export default function SocialShare({ slug }) {
  console.log(slug); // Debugging the received slug prop

  const [showAll, setShowAll] = useState(false); // By default set to false

  // Construct the base URL for sharing
  const baseUrl = `https://stg-wparena-staging.kinsta.cloud/${slug}`;

  // Social media URLs using the base URL and slug
  const fbShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(baseUrl)}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(baseUrl)}`;
  const telegramShareUrl = `https://t.me/share/url?url=${encodeURIComponent(baseUrl)}`;
  const linkedinShareUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(baseUrl)}`;
  const pinterestShareUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(baseUrl)}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(baseUrl)}`;
  const emailShareUrl = `mailto:?subject=Check%20this%20out&body=${encodeURIComponent(baseUrl)}`;
  const redditShareUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(baseUrl)}`;

  const socialPlatforms = [
    { name: "Reddit", icon: FaRedditAlien, color: "text-red-400", border: "border-red-400", url: redditShareUrl, title: "Share on Reddit" },
    { name: "Email", icon: AiOutlineMail, color: "text-blue-800", border: "border-blue-800", url: emailShareUrl, title: "Send via Email" },
    { name: "Telegram", icon: RiTelegramFill, color: "text-blue-400", border: "border-blue-400", url: telegramShareUrl, title: "Share on Telegram" },
  ];

  // Function to copy URL to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(baseUrl).then(() => {
    
    }).catch((err) => {
      console.error("Failed to copy: ", err);
    });
  };

  return (
    <div className="flex flex-wrap gap-2 py-4 w-[95%]">
      {/* Facebook (Always Visible) */}
      <a title="Share on Facebook" href={fbShareUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-white font-medium border border-blue-700">
        <div className="p-3 bg-blue-900 flex items-center justify-center">
          <FaFacebookF className="text-white text-lg" />
        </div>
        <span className="px-3 py-2 bg-gray-100 text-blue-800">Facebook</span>
      </a>

      {/* Twitter */}
      <a title="Share on Twitter" href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-white font-medium border border-blue-400">
        <div className="p-3 bg-blue-900 flex items-center justify-center">
          <BsTwitterX className="text-white text-lg" />
        </div>
        <span className="px-3 py-2 bg-gray-100 text-blue-400">Twitter</span>
      </a>

      {/* Pinterest */}
      <a title="Pin on Pinterest" href={pinterestShareUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-white font-medium">
        <div className="p-3 bg-blue-900 flex items-center justify-center">
          <FaPinterestP className="text-white text-lg" />
        </div>
        <span className="px-3 py-2 text-red-400 border-t border-r border-b border-red-400">Pinterest</span>
      </a>

      {/* WhatsApp */}
      <a title="Share on WhatsApp" href={whatsappShareUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-white font-medium">
        <div className="p-3 bg-blue-900 flex items-center justify-center">
          <FaWhatsapp className="text-white text-lg" />
        </div>
        <span className="px-3 py-2 text-green-400 border-t border-r border-b border-green-400">WhatsApp</span>
      </a>

      {/* LinkedIn */}
      <a title="Share on LinkedIn" href={linkedinShareUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-white font-medium">
        <div className="p-3 bg-blue-900 flex items-center justify-center">
          <FaLinkedinIn className="text-white text-lg" />
        </div>
        <span className="px-3 py-2 text-blue-800 border-t border-r border-b border-blue-800">LinkedIn</span>
      </a>

      {/* Show other social links if showAll is true */}
      {showAll &&
        socialPlatforms.map(({ name, icon: Icon, color, border, url, title }, index) => (
          <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="flex items-center text-white font-medium" title={title}>
            <div className="p-3 bg-blue-900 flex items-center justify-center">
              <Icon className="text-white text-lg" />
            </div>
            <span className={`px-3 py-2 bg-gray-100 ${color} border-t border-r border-b ${border}`}>
              {name}
            </span>
          </a>
        ))}

      {/* Copy URL Button (Will be shown only when showAll is true) */}
      {showAll && (
        <button
          onClick={copyToClipboard}
          className="flex items-center text-white font-medium border border-blue-800"
          title="Copy the URL"
        >
          <div className="p-3 bg-blue-900 flex items-center justify-center">
            <FaLink className="text-white text-lg" />
          </div>
          <span className="px-3 py-2 bg-gray-100 text-blue-800">Copy URL</span>
        </button>
      )}

      {/* Toggle Button (Plus/Minus) */}
      <div
        className="border border-gray-200 px-4 py-2 rounded flex items-center justify-center cursor-pointer"
        onClick={() => setShowAll(!showAll)} // Toggles between showAll states
      >
        {showAll ? <RiSubtractFill className="text-black text-lg" /> : <FaPlus className="text-black text-lg" />}
      </div>
    </div>
  );
}
