import Link from "next/link";
import Image from "next/image";

const Navbar2 = () => {
  return (
    <nav className="bg-[#2a80b9] py-4">
      <div className="container mx-auto flex justify-center space-x-4 font-sans">
        <Link
          href="/wordpress-blog"
          className="text-white font-semibold bg-[#2a77ab] hover:text-blue-200 border-[#70abd0] border-2 rounded whitespace-nowrap"
        >
          <div className="flex items-center space-x-2 px-2 w-[250px]">
            <Image
              src="/blog 1.png"
              width={50}
              height={50}
              className="px-2"
              alt="WordPress Blog Icon" // Add alt attribute
            />
            <span className="text-[#5288c1] text-2xl h-10 pr-4">|</span>
            <span className="pr-10">WORDPRESS BLOG</span>
          </div>
        </Link>

        <Link
          href="/wordpress-hosting"
          className="text-white font-semibold px-4 bg-[#2a77ab] hover:text-blue-200 border-[#70abd0] border-2 rounded whitespace-nowrap"
        >
          <div className="flex items-center space-x-2 px-2 w-[250px]">
            <Image
              src="/cloud.png"
              width={50}
              height={50}
              className="pr-3"
              alt="WordPress Hosting Icon" // Add alt attribute
            />
            <span className="text-[#5288c1] text-2xl h-10 pr-4">|</span>
            <span className="pr-10">WORDPRESS HOSTING</span>
          </div>
        </Link>

        <Link
          href="/pro-services"
          className="text-white font-semibold px-4 bg-[#2a77ab] hover:text-blue-200 border-[#70abd0] border-2 rounded whitespace-nowrap"
        >
          <div className="flex items-center space-x-2 px-2 w-[270px] ">
            <Image
              src="/nav3.png"
              width={40}
              height={40}
              className="pr-3"
              alt="Pro Services Icon" // Add alt attribute
            />
            <span className="text-[#5288c1] text-2xl h-10 pr-6">|</span>
            <span className="pr-8">PRO SERVICES</span>
          </div>
        </Link>

        <Link
          href="/wp-tutorials"
          className="text-white font-semibold px-4 bg-[#2a77ab] hover:text-blue-200 border-[#70abd0] border-2 rounded whitespace-nowrap"
        >
          <div className="flex items-center space-x-2 px-2 w-[270px]">
            <Image
              src="/nav9.png"
              width={40}
              height={40}
              alt="WP Tutorials Icon" // Add alt attribute
              className="pr-3"
            />
            <span className="text-[#5288c1] text-2xl h-10 pr-6">|</span>
            <span className="pr-8">WP TUTORIALS</span>
          </div>
        </Link>

        <Link
          href="/our-themes"
          className="text-white font-semibold px-4 bg-[#2a77ab] hover:text-blue-200 border-[#70abd0] border-2 rounded whitespace-nowrap"
        >
          <div className="flex items-center space-x-2 px-2 w-[270px]">
            <Image
              src="/copy.png"
              width={40}
              height={40}
              className="pr-3"
              alt="Our Themes Icon" // Add alt attribute
            />
            <span className="text-[#5288c1] text-2xl h-10 pr-6">|</span>
            <span className="pr-8">OUR THEMES</span>
          </div>
        </Link>

        <Link
          href="/speed-optimization"
          className="text-white font-semibold px-4 bg-[#2a77ab] hover:text-blue-200 border-[#70abd0] border-2 rounded whitespace-nowrap"
        >
          <div className="flex items-center space-x-2 px-2 w-[270px] ">
            <Image
              src="/micro.png"
              width={40}
              height={40}
              alt="Speed Optimization Icon" // Add alt attribute
              className="pr-3"
            />
            <span className="text-[#5288c1] text-2xl h-10 pr-6">|</span>
            <span className="pr-8">SPEED OPTIMIZATION</span>
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar2;
