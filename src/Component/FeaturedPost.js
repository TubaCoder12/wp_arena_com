import Image from "next/image";

export default function FeaturedPosts({ posts }) {
  if (!posts || posts.length === 0) return <p>No posts available</p>;
 

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">WPArena Coupons and Deals</h1>
        <p className="text-gray-600 mt-4 max-w-6xl mx-auto leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-10">
        {posts.map((post) => {
          const acfData = post.acf ? JSON.parse(post.acf) : {}; // JSON Parse

          return (
            <div
              key={post.id}
              className="bg-white border rounded-lg py-3  px-4 flex items-center space-x-4"
            >
              {/* Image */}
              <div className="border rounded-full flex items-center p-3">
  <div className="w-14 h-14 overflow-hidden rounded-full">
    <Image
      src={post.featuredImage?.node?.sourceUrl || "/fallback-image.jpg"}
      alt={post.title}
      width={54}
      height={54}
      className="object-cover w-full h-full rounded-full"
    />
  </div>
</div>

              <div className="text-gray-300 border-l-2 text-3xl h-20 pr-4"></div>

              {/* Title & Discount */}
              <div>
                <h3 className="text-[18px] font-semibold text-[#161a3a] pr-4  ">{post.title}</h3>

                {/* Discount Display */}
                {acfData.coupons_discount && (
                  <p className="mt-1  text-[#629eca] font-[500] ">
                    {acfData.coupons_discount}% OFF
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* View All Button */}
      {posts.length === 17 && (
        <div className="text-center mt-10">
          <button className="px-8 py-3 bg-black text-white rounded shadow hover:bg-gray-700 transition">
            View All
          </button>
        </div>
      )}
    </div>
  );
}
