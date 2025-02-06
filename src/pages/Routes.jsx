import Link from "next/link";
import { usePathname } from "next/navigation";

const Routes = ({ onRouteClick }) => {
  const pathname = usePathname()?.toLowerCase(); // Ensure lowercase for accurate matching

  return (
    <nav className="bg-white p-14 border-b-2">
      <ul className="flex space-x-4 ml-28">
        {[
          { href: "/review", label: "Reviews" },
          { href: "/news", label: "News" },
          { href: "/latest", label: "Latest" },
          { href: "/editorials", label: "Editorials" },
          { href: "/categories", label: "Categories" },
        ].map((route) => (
          <li key={route.href}>
            <Link
              href={route.href}
              onClick={(e) => {
                e.preventDefault(); // Prevent page reload
                onRouteClick(route.label);
              }}
              className={`px-4 py-2 border-2 border-black rounded-md transition duration-300 
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
