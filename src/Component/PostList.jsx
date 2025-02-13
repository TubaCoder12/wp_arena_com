import Image from "next/image";

export default function PostList({ pageData }) {
  console.log(pageData);

  if (!pageData) {
    return <p className="text-red-400">No page data available.</p>;
  }

  return (
    <section
      style={{ backgroundImage: `url("/homebanner-watermark.png")` }}
      className="bg-[#ebf1ff] -z-10 w-full bg-no-repeat"
    >
      <div className="hero-banner flex flex-col md:flex-row items-center justify-center w-full h-full px-4 md:px-24 py-8">
        {/* Left Side - Content */}
        <div className="left w-full md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-center sm:text-left text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-700">
            {pageData?.title || "Default Title"}
          </h1>
          <p className="text-center text-gray-700 sm:text-left font-medium mt-4 lg:mt-8 text-sm md:text-base lg:text-lg">
            {pageData?.rankMathDescription || "Default Description"}
          </p>
          <div className="mt-4 lg:mt-8">
            <form className="flex flex-col sm:flex-row">
              <input
                className="w-full sm:w-1/2 h-12 px-4 text-lg font-semibold text-black"
                type="email"
                required
                placeholder="Email: *"
              />
              <button className="w-[170px] h-[45px] rounded-sm bg-gray-800 px-6 py-3 text-white hover:bg-[#2980b9] font-semibold">
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
