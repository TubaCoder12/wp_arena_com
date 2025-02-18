import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gql } from "@apollo/client";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import client from "../lab/apolloClient";

// ✅ GraphQL Query for Popular Services
export const GET_POPULAR_POSTS = gql`
  query GetPopularPosts {
    services {
      nodes {
        id
        title
        content
        date
        slug
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

// ✅ Timeline Component
const Timeline = ({ services }) => {
  const [visibleServices, setVisibleServices] = useState(5);
  const loadMoreServices = () => setVisibleServices((prev) => prev + 3);
  const visiblePosts = services.slice(0, visibleServices);

  return (
    <>
      <div className="font-bold text-4xl mt-4 ml-28">Popular Services</div>

      <section className="relative sm:py-20 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20">
        <div className="relative">
          {services.length === 0 ? (
            <div className="flex justify-center items-center h-96">
              <AiOutlineLoading3Quarters className="animate-spin text-2xl font-semibold" />
            </div>
          ) : (
            <div>
              <div className="absolute left-0 sm:left-[46px] w-3 sm:w-4 h-3 sm:h-4 bg-gray-800 rounded-full hidden lg:block"></div>
              <div className="absolute left-1.5 sm:left-[52px] w-0.5 sm:w-1 h-full bg-gray-800 -z-10 hidden lg:block"></div>

              <div className="space-y-4 w-full lg:mx-auto">
                {visiblePosts.map((service, index) => (
                  <div key={service.id} className="relative pl-8 lg:pl-36">
                    <div className="bg-white rounded-lg border-b overflow-hidden">
                      <div className="flex flex-col lg:flex-row gap-4 p-4 sm:p-6">
                        <div className="w-full lg:w-[400px] h-[200px] relative">
                          {service.featuredImage?.node?.sourceUrl ? (
                            <Image
                              src={service.featuredImage.node.sourceUrl}
                              alt="Service Image"
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
                            <Link href={`/Services/${service.slug}`} className="text-gray-800 hover:text-[#2980b9]">
                              {service.title}
                            </Link>
                          </h3>
                          
                          <div
                            className="text-lg text-black line-clamp-3"
                            dangerouslySetInnerHTML={{ __html: service.content }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* ✅ Date Box Fix */}
                    <div className="absolute left-[-12px] sm:left-0 top-[50%] transform -translate-y-1/2 w-20 h-20 sm:w-28 sm:h-28 rounded-full border-4 border-white bg-gray-800 text-white flex items-center justify-center hidden lg:flex">
                      <div className="flex flex-col items-center justify-center border-2 w-24 h-24 border-white rounded-full">
                        <span className="text-lg font-bold">
                          {new Date(service.date).toLocaleString("default", {
                            month: "short",
                          })}
                        </span>
                        <span className="text-lg font-bold">
                          {new Date(service.date).getDate()}/
                          {new Date(service.date).getFullYear()}
                        </span>
                      </div>
                    </div>

                    
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 sm:left-[46px] w-3 sm:w-4 h-3 sm:h-4 bg-gray-800 rounded-full"></div>
              {/* ✅ Load More Button Fix */}
              {visibleServices < services.length && (
                <div className="text-center mt-8">
                  <button
                    onClick={loadMoreServices}
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

// ✅ getStaticProps - Fetching Popular Services
export async function getStaticProps() {
  try {
    const { data } = await client.query({
      query: GET_POPULAR_POSTS,
    });

    return {
      props: {
        services: data.services.nodes || [],
      },
      revalidate: 86400, // ✅ Revalidate every 24 hours
    };
  } catch (error) {
    console.error("Error fetching services:", error);
    return {
      props: {
        services: [],
      },
    };
  }
}

// ✅ Page Component
export default function Page({ services }) {
  return <Timeline services={services} />;
}
