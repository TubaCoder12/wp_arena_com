import React from "react";
import Image from "next/image";
import { gql } from "graphql-request";
import client from "@/lab/Client";

const Get_Deals = gql`
  query GetDeals {
    deals {
      nodes {
        id
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

export async function getServerSideProps() {
  try {
    const { data } = await client.query({
      query: Get_Deals,
    });;

    return {
      props: { posts: data?.deals?.nodes || [] },
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: { posts: [] },
    };
  }
}

export default function FeaturedPosts({ posts }) {
  console.log("Rendered Posts:", posts);

  if (!posts || posts.length === 0) return <p>No posts available</p>;

  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">WPArena Coupons and Deals</h1>
        <p className="text-gray-600 mt-4 max-w-6xl mx-auto leading-relaxed">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-10">
        {posts.map((post) => {
          let acfData = {};
          if (post.acf && typeof post.acf === "string") {
            try {
              acfData = JSON.parse(post.acf);
            } catch (error) {
              console.error("Error parsing ACF data:", error);
            }
          } else {
            acfData = post.acf || {};
          }

          return (
            <div key={post.id} className="bg-white border rounded-lg py-3 px-4 flex items-center space-x-4">
              <div className="border rounded-full flex items-center p-3">
                <div className="w-14 h-14 overflow-hidden rounded-full">
                  <Image
                    src={post.featuredImage?.node?.sourceUrl || "/fallback-image.jpg"}
                    alt={post.title || "Default Image"}
                    width={54}
                    height={54}
                    className="object-cover w-full h-full rounded-full"
                  />
                </div>
              </div>

              <div className="text-gray-300 border-l-2 text-3xl h-20 pr-4"></div>

              <div>
                <h3 className="text-[18px] font-semibold text-[#161a3a] pr-4">
                  {post.title}
                </h3>

                {acfData.coupons_discount && (
                  <p className="mt-1 text-[#629eca] font-[500]">
                    {acfData.coupons_discount}% OFF
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
