
  import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import client from "../lab/Client";


// ✅ GraphQL Query
export const GET_POSTS_BY_CATEGORY = gql`
  {
    ourplugins{
      nodes {
        id
        databaseId
        slug
        uri
        title
        content
        date
        featuredImage {
          node {
            sourceUrl
          }
        }
        acf
      }
    }
  }
`;


// ✅ Timeline Component
const Timeline = ({ posts }) => {
 
  const [visibleBlogs, setVisibleBlogs] = useState(5);
  const loadMoreBlogs = () => setVisibleBlogs((prev) => prev + 3);
  const visiblePosts = posts.slice(0, visibleBlogs);

  return (
    <>
      <div className="font-bold text-4xl mt-10 ml-28 mb-5">WPArena Plugins</div>
      <div className="mx-[120px] leading-6">
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel cupiditate cumque totam fugiat ad inventore nesciunt, dolore quibusdam veniam saepe ea recusandae ipsum quaerat vero vitae, soluta repellendus voluptatum obcaecati?
        Sapiente, iste eius? Laborum in dolorem cupiditate soluta et, omnis, deserunt excepturi praesentium dolor maxime deleniti. Qui voluptatem, inventore perspiciatis voluptates, cum sunt voluptate nam ipsum nostrum, vel quia sapiente?soluta et, omnis, deserunt excepturi praesentium dolor maxime deleniti. Qui voluptatem, inventore perspiciatis voluptates, cum sunt voluptate nam ipsum nostrum, vel quia sapiente</p>
      </div>
   

      <div className="mt-4 lg:mt-8">
  <form className="relative w-full sm:w-2/3 md:w-[400px] lg:w-[1680px] mx-auto">
    <input
      className="w-full h-[50px] px-3 pr-[150px] text-lg font-semibold text-[#333] outline-none  rounded bg-[#ebf1ff]  "
      type="email"
      placeholder="Serach Plugins..."
    />
    <button className="absolute right-0 top-1/2 -translate-y-1/2  h-[50px] bg-gray-800 text-white  font-semibold rounded px-16 py-2 hover:bg-[#2980b9] whitespace-nowrap text-[18px]">
      SERACH
    </button>
  </form>
</div>
    <section className="relative  sm:py-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
     
      <div className="relative">
        {posts.length === 0 ? (
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
                  <div className="bg-white  overflow-hidden">
                    <div className="flex flex-col lg:flex-row gap-4 p-4 sm:p-6">
                    <div className="w-full lg:w-[400px] h-[200px] relative">
  <Image
    src={post.featuredImage?.node?.sourceUrl || "/header.png"} // ✅ Default image fallback
    alt={post.featuredImage?.node?.altText || "Post image"}
    layout="fill"
    objectFit="cover"
    className="rounded-lg"
  />
</div>

                      <div className="flex flex-col space-y-4 flex-1 ml-10">
                        <h3 className="text-2xl font-semibold">
                          <Link
                            href={{
                              pathname: `/Plugin/${post.slug}`,
                              query: { id: post.slug },
                            }}
                            className="text-gray-800 hover:text-[#2980b9]"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        
                        <div
                          className="text-lg text-black line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: post.content || "iste eius? Laborum in dolorem cupiditate soluta et, omnis, deserunt excepturi praesentium dolor maxime deleniti. Qui voluptatem, inventore perspiciatis voluptates, cum sunt voluptate nam ipsum nostrum, vel quia sapiente?soluta et, omnis, deserunt excepturi praesentium dolor maxime deleniti. " }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="absolute left-[-12px] sm:left-0 top-[50%] transform -translate-y-1/2 w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-white bg-gray-800 text-white flex items-center justify-center hidden lg:flex">
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

                 
                </div>
              ))}
            </div>
            <div className="absolute bottom-0 left-0 sm:left-[46px] w-3 sm:w-4 h-3 sm:h-4 bg-gray-800 rounded-full "></div>
            {visibleBlogs < posts.length && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMoreBlogs}
                  className="bg-gray-800 text-white px-4 sm:px-6 py-3 rounded-sm hover:bg-[#2980b9] transition duration-300 text-lg font-semibold"
                >
                  LOAD MORE
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
    </>
  );
};

// ✅ getStaticProps
export async function getStaticProps() {
    try {
      const { data } = await client.query({
        query: GET_POSTS_BY_CATEGORY,
      });

      return {
        props: {
          posts: data.ourplugins.nodes || [], // ✅ Correct reference
        },
        revalidate: 86400, // ✅ Revalidate after 24 hours
      };
    } catch (error) {
      console.error("Error fetching posts:", error);
      return {
        props: {
          posts: [],
        },
      };
    }
}


  

// ✅ Page Component
export default function Page({ posts }) {
  return <Timeline posts={posts} />;
}
