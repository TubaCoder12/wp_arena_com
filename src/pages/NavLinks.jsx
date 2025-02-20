import Link from "next/link";

const links = [
  { name: "News", href: "/News" },
  { name: "Directory", href: "/Directory" },
  { name: "Tutorials", href: "/Tutorials" },
  { name: "Deals & Coupons", href: "/DealsCoupons" },
  { name: "Plugins", href: "/Plugin" },
  { name: "Themes", href: "/Themes" },
  { name: "Advertise", href: "/sitemap" },
  { name: "Toolkit", href: "/ProService" },
  { name: "About Us", href: "/terms" },
  { name: "Statistics", href: "/Statistics" },
  { name: "Advanced Search", href: "/collection" },
  { name: "Free Blog Setup", href: "/sitemap" },
  { name: "Contact", href: "/privacy-policy" },
 

                    
];

export default function NavLinks() {
  return (
    <div className="flex justify-center text-gray-300 text-sm my-4 flex-wrap gap-x-4 gap-y-2 md:gap-y-0">
      {links.map((link, index) => (
        <Link key={index} href={link.href} className="hover:text-white flex items-center font-semibold">
          {link.name}
          {index < links.length - 1 && <span className="hidden md:inline mx-4">|</span>}
        </Link>
      ))}
    </div>
  );
}
