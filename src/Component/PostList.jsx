import Image from "next/image";

export default function PostList({ pageData }) {
  
  if (!pageData) {
    return <p className="text-red-400">No page data available.</p>;
  }

  return (
    <section
      style={{ backgroundImage: `url("/homebanner-watermark.png")` }}
      className="bg-[#ebf1ff] -z-10 w-full bg-no-repeat"
    >
      <div className="hero-banner flex flex-col md:flex-row items-center justify-center w-full h-full  md:px-24 py-8">
        {/* Left Side - Content */}
        <div className="left w-full lg:w-[35%] md:w-1/2 mb-8 md:mb-0 lg:mr-[155px]">
          <h1 className="text-center sm:text-left text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-semibold text-gray-700">
          16 Years of Passion & Expertise
          </h1>
          <p className="text-center text-gray-700 sm:text-left font-medium mt-4 lg:mt-8 text-sm md:text-base lg:text-xl">
            {pageData?.rankMathDescription || "Default Description"}
          </p>
          <div className="mt-4 lg:mt-8">
  <form className="relative w-full sm:w-2/3 md:w-[400px] lg:w-[600px]">
    <input
      className="w-full h-12 px-3 pr-[150px] text-lg font-semibold text-black outline-none border border-gray-300 rounded-sm"
      type="email"
      placeholder="Email: *"
    />
    <button className="absolute right-0 top-1/2 -translate-y-1/2 w-[140px] h-[46px] bg-gray-800 text-white text-sm font-semibold rounded-r-sm px-6 py-2 hover:bg-[#2980b9] whitespace-nowrap">
      START NOW
    </button>
  </form>
</div>





        </div>

        {/* Right Side - Image */}
        <div className="right w-full md:w-1/2 flex justify-center">
          <Image
            src="/wp-arena-tp-banner.png"
            width={800}  
            height={600} 
            alt="Hero section"
            className="w-full h-auto object-cover max-w-[800px] lg:max-w-[1000px]" 
          />
        </div>
      </div>
    </section>
  );
}
