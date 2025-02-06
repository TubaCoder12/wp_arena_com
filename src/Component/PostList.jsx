export default function PostList({ pageData }) {
    console.log(pageData);
  
    // If pageData is not available, display a message
    if (!pageData) {
      return <p className="text-red-400">No page data available.</p>;
    }
  
    return (
      <div className="relative h-[400px] bg-cover bg-center bg-no-repeat bg-[url('/heroImage.jfif')]">
      <div className="absolute inset-0 flex items-center">
        <div className="ml-36 text-white max-w-lg">
         
              <h1 className="text-4xl font-bold mb-4 text-black">
                {pageData?.title || 'Default Title'}
              </h1>
              <p className="text-lg mb-6 text-black">
                {pageData?.rankMathDescription || 'Default Description'}
              </p>
          {/* Form for email input */}
          <form className="flex">
            <input
              type="email"
              placeholder="Email: *"
              className="px-4 py-2 rounded-l-md w-[350px] border focus:outline-none text-black"
            />
            <button type="submit" className="bg-black text-white px-6 py-2 rounded-r-md font-bold">
              START NOW
            </button>
          </form>
        </div>
      </div>
    </div>
      
    );
  }
  