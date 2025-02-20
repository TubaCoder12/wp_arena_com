

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import client from "../lab/Client";


const stats = [
    { icon: "/sta1.png", value: "20+", label: "Years of Experience" },
    { icon: "/sta2.png", value: "7K+", label: "Happy Customers" },
    { icon: "/sta3.png", value: "10K+", label: "WPArena-Blogs" },
    { icon: "/sta4.png", value: "7K+", label: "Projects Completed" },
    { icon: "/sta5.png", value: "2K+", label: "Our Themes" },
  ];
export const GET_POSTS_BY_CATEGORY = gql`
{
 posts(first: 10, where: { orderby: { field: DATE, order: DESC } }) {
    nodes {
      id
      slug
      title
      content
      date
featuredImage {
        node {
          sourceUrl
        }
      }
      author {
        node {
          id
          name
        }
      }
      postViewsCount
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
    <div className="font-bold text-4xl mt-10 ml-28 my-5">WPArena Directory</div>
      <div className="mx-[120px] leading-8 ">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel cupiditate cumque totam fugiat ad inventore nesciunt, dolore quibusdam veniam saepe ea recusandae ipsum quaerat vero vitae, soluta repellendus voluptatum obcaecati? Sapiente, iste eius? Laborum in dolorem cupiditate soluta et, omnis, deserunt excepturi praesentium dolor maxime deleniti. Qui voluptatem, inventore perspiciatis voluptates, cum sunt voluptate nam ipsum nostrum, vel quia sapiente?
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 p-6 pt-12 max-w-full mx-24  ">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-[#ebf1ff] px-10 py-16 rounded-lg  text-center  "
          >  
            <div className="bg-[#2980b9] rounded-full lg:w-36 lg:h-36 flex items-center justify-center mx-auto mb-3  ">
  <Image src={stat.icon} alt={stat.label} width={80} height={80}
  className="p-2" />
</div>

            
            <h3 className="text-5xl font-bold text-gray-900 mt-8">{stat.value}</h3>
            <p className="text-gray-600 mt-2 text-[20px] font-bold">{stat.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-[#333333] rounded-md w-[1670px] mx-auto">
        <p className="text-white p-6 text-2xl font-bold">MOST VISITED BLOGS</p>
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
                 <div className="bg-white   overflow-hidden">
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
                     <div className="flex flex-col space-y-4 flex-1 ml-8">
                       <h3 className="text-2xl font-semibold">
                         <Link
                           href={{
                             pathname: `/post/${post.id}`,
                             query: { id: post.id },
                           }}
                           className="text-gray-800 hover:text-[#2980b9]"
                         >
                           {post.title}
                         </Link>
                       </h3>
                       <p className="text-sm font-semibold text-black flex">
                         Recent updated by
                         <span className="text-[#2980b9] ml-2 flex items-center">
                           {post.author?.node?.name || "Unknown Author"}
                           <Image
                             src="/share-icon.png"
                             alt="share-icon"
                             width={15}
                             height={15}
                             className="ml-2 bg-[#297fba] p-1 rounded-sm"
                           />
                         </span>
                       </p>
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

      // ✅ Sorting posts based on postViewsCount
      const sortedPosts = data.posts.nodes
        .filter(post => post.postViewsCount !== null)  
        .sort((a, b) => Number(b.postViewsCount) - Number(a.postViewsCount));

      return {
        props: {
          posts: sortedPosts, // ✅ Send sorted posts
        },
        revalidate: 86400, // Revalidate after 24 hours
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




