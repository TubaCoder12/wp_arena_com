import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import client from "../lab/Client";


// ✅ GraphQL Query
export const GET_POSTS_BY_CATEGORY = gql`
  query {
  ourthemes {
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
      <div className="font-bold text-4xl mt-4 ml-28">Tutorials</div>
   
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
                        {post.featuredImage?.node?.sourceUrl ? (
                          <Image
                            src={post.featuredImage.node.sourceUrl}
                            alt={post.featuredImage.node.altText || "Post image"}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded-lg ml-8"></div>
                        )}
                      </div>
                      <div className="flex flex-col space-y-4 flex-1">
                        <h3 className="text-2xl font-semibold">
                          <Link
                            href={{
                              pathname: `/Theme/${post.slug}`,
                              query: { id: post.slug },
                            }}
                            className="text-gray-800 hover:text-[#2980b9]"
                          >
                            {post.title}
                          </Link>
                        </h3>
                        
                        <div
                          className="text-lg text-black line-clamp-3"
                          dangerouslySetInnerHTML={{ __html: post.content }}
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
            <div className="absolute bottom-0 left-0 sm:left-[46px] w-3 sm:w-4 h-3 sm:h-4 bg-gray-800 rounded-full"></div>
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
          posts: data.ourthemes.nodes || [],
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
