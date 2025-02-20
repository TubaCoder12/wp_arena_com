import Link from "next/link";
import { usePathname } from "next/navigation";

const Routes = ({ onRouteClick }) => {
  const pathname = usePathname()?.toLowerCase(); // Ensure lowercase for accurate matching

  return (
    <nav className="bg-white pt-20  ">
      <ul className="flex lg:space-x-4 lg:mx-28 md:mx-14 mx-3  space-x-2">
      {[
          { href: "/review", label: "Reviews" },
          { href: "/news", label: "News" },
          { href: "/latest", label: "Latest" },
          { href: "/editorials", label: "Editorials" },
          
        ].map((route) => (
          <li key={route.href}>
            <Link
              href={route.href}
              onClick={(e) => {
                e.preventDefault(); // Prevent page reload
                onRouteClick(route.label);
              }}
              className={`px-2 py-2 border-2 border-[#4d4d4d] rounded transition duration-300 sm lg:px-14 font-semibold
                ${
                  pathname?.startsWith(route.href)
                    ? "bg-black text-white"
                    : "text-black"
                } 
                hover:bg-black hover:text-white focus:bg-black focus:text-white`}
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Routes;
