import Image from "next/image";

export default function FeaturedPosts({ posts }) {
  if (!posts || posts.length === 0) return <p>No posts available</p>;
  console.log("Posts Data:", posts);

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">WPArena Coupons and Deals</h1>
        <p className="text-gray-600 mt-4 max-w-6xl mx-auto leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {posts.map((post) => {
          const acfData = post.acf ? JSON.parse(post.acf) : {}; // JSON Parse

          return (
            <div
              key={post.id}
              className="bg-white shadow-[0_0_10px_2px_rgba(0,0,0,0.1)] rounded-lg p-6 flex items-center space-x-4"
            >
              {/* Image */}
              <div className="w-16 h-16 mt-6">
                <Image
                  src={post.featuredImage?.node?.sourceUrl || "/fallback-image.jpg"}
                  alt={post.title}
                  width={100}
                  height={100}
                  className="object-contain rounded-full"
                />
              </div>
              <div className="text-gray-300 text-3xl h-10">|</div>

              {/* Title & Discount */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{post.title}</h3>

                {/* Discount Display */}
                {acfData.coupons_discount && (
                  <p className="mt-1 text-lg text-blue-500 ">
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
