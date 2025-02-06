 'use client'
 import { useState } from 'react';
 import Image from 'next/image'; // If using Next.js
 import Link from 'next/link';
 import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // If using react-icons
  export default function  CategoryList  ({ categories })  {
  console.log(categories )
  const [visibleBlogs, setVisibleBlogs] = useState(5);

  const loadMoreBlogs = () => {
    setVisibleBlogs((prevVisibleBlogs) => prevVisibleBlogs + 3);
  };

  const visiblePosts = categories.slice(0, visibleBlogs);

  return (
    <section className="relative py-4 sm:py-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
      <div className="relative">
        {categories.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <AiOutlineLoading3Quarters className="animate-spin text-2xl font-semibold" />
          </div>
        ) : (
          <div>
            <div className="absolute left-0 sm:left-[46px] w-3 sm:w-4 h-3 sm:h-4 bg-gray-800 rounded-full hidden lg:block"></div>
            <div className="absolute left-1.5 sm:left-[52px] w-0.5 sm:w-1 h-full bg-gray-800 -z-10 hidden lg:block"></div>

            <div className="space-y-4 w-full">
              {visiblePosts.map((post, index) => (
                <div key={post.id} className="relative pl-8 lg:pl-36">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="flex flex-col lg:flex-row gap-4 p-4 sm:p-6">
                      <div className="w-full lg:w-[400px] h-[200px] relative">
                        {post.featuredImage?.node?.sourceUrl ? (
                          <Image
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.featuredImage.node.altText || "Post image"}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded-lg"></div>
                        )}
                      </div>
                      <div className="flex flex-col space-y-4 flex-1">
                        <h3 className="text-2xl font-semibold">
                          <Link
                            href={{
                              pathname: `/post/ ${post.id}`,
                              query: { id: post.id },
                            }}
                            className="text-gray-800 hover:text-[#2980b9]"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-sm font-semibold text-black flex">
                          Recently updated by
                          <span className="text-[#2980b9] ml-2 flex items-center">
                            {post.author?.node?.name || "Unknown Author"}
                            <Image
                              src="/share-icon.png"
                              alt="share-icon"
                              width={15}
                              height={15}
                              className="ml-2 bg-[#297fba] p-0.5 rounded-sm"
                            />
                          </span>
                        </p>

                        <div
                          className="text-lg text-black line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: post.excerpt }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-[-12px] sm:left-0 top-[50%] sm:top-[50%] transform -translate-y-1/2 w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-white bg-gray-800 text-white flex items-center justify-center hidden lg:flex">
                    <div className="flex flex-col items-center justify-center border-2 w-24 h-24 border-white rounded-full">
                      <span className="text-lg font-bold">
                        {new Date(post.date).toLocaleString("default", {
                          month: "short",
                        })}
                      </span>
                      <span className="text-lg font-bold">
                        {new Date(post.date).getDate()}/
                        {new Date(post.date).getFullYear()}
                      </span>
                    </div>
                  </div>

                  {index === visiblePosts.length - 1 && (
                    <div className="absolute left-[46px] bottom-[-90px] w-4 h-4 bg-gray-800 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>

            {visibleBlogs < categories.length && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMoreBlogs}
                  className="bg-gray-800 text-white px-4 sm:px-6 py-3 rounded-sm hover:bg-[#2980b9] transition duration-300 text-lg font-semibold"
                  disabled={visibleBlogs >= categories.length}
                >
                  {visibleBlogs >= categories.length ? "No more posts" : "LOAD MORE"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
