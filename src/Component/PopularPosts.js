"use client"; // Hydration issue fix

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import sanitizeHtml from "sanitize-html";

export default function PopularPosts({ services }) {
  const [visibleServices, setVisibleServices] = useState(6);
  const [sanitizedServices, setSanitizedServices] = useState([]);

  useEffect(() => {
    if (services) {
      setSanitizedServices(
        services.map((service) => ({
          ...service,
          sanitizedContent: sanitizeHtml(service.content?.substring(0, 200) || ""),
        }))
      );
    }
  }, [services]);

  if (!sanitizedServices || sanitizedServices.length === 0) {
    return <p className="text-center text-gray-500">No data available</p>;
  }

  return (
    <section className="my-10">
      <div className="container mx-auto px-6 lg:px-12 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Pro Services</h2>
        <p className="text-gray-600 mt-4">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has been the industry's standard dummy text ever since the 1500s.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {sanitizedServices.slice(0, visibleServices).map((service) => (
            <Link key={service.id} href={`/Services/${service.id}`} passHref>
              <div className="relative group bg-gray-100 p-6 rounded-lg shadow overflow-hidden transition">
                {/* Hover Background */}
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition"
                  style={{ backgroundImage: `url('/hover.jpg')` }}
                ></div>

                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="bg-blue-100 rounded-full p-4 group-hover:bg-gray-700">
                    {service.featuredImage?.node?.sourceUrl ? (
                      <Image
                        src={service.featuredImage.node.sourceUrl}
                        width={100}
                        height={100}
                        alt={service.title}
                        className="w-16 h-16 rounded-full object-cover"
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="/placeholder.jpg"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-300"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mt-4 group-hover:text-white">
                    {service.title}
                  </h3>

                  {/* Safe Content Rendering */}
                  <p
                    className="text-gray-600 mt-2 group-hover:text-white"
                    dangerouslySetInnerHTML={{ __html: service.sanitizedContent + "..." }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Load More Button */}
        {sanitizedServices.length > visibleServices && (
          <button
            onClick={() => setVisibleServices((prev) => prev + 6)}
            className="mt-10 px-6 py-3 bg-black text-white rounded-lg shadow hover:bg-gray-800 transition"
          >
            Load More
          </button>
        )}
      </div>
    </section>
  );
}
