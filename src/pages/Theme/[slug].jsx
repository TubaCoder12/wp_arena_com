import React, { useRef } from "react";
import { GraphQLClient, gql } from "graphql-request";
import Image from "next/image";
import { useRouter } from "next/router";
import ServiceSocial from "../ServiceSocial";
import ThemeSocial from "../ThemeSocial";

const endpoint = "https://stg-wparena-staging.kinsta.cloud/graphql";

// ✅ Query to Fetch Data by Slug
const GET_SERVICE_BY_SLUG = gql`
  query OurTheme($slug: ID!) {
    ourtheme(id: $slug, idType: SLUG) {
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
      acf
    }
  }
`;

const ServiceDetails = ({ service, error }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading...</p>;
  }

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!service) return <p className="text-gray-500">No service found.</p>;

  let acfData = {};
  if (service.acf && typeof service.acf === "string") {
    try {
      acfData = JSON.parse(service.acf);
    } catch (parseError) {
      console.error("Error parsing ACF data:", parseError);
    }
  }

  const overviewRef = useRef(null);
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mx-auto px-8 max-w-7xl">
      <ThemeSocial slug={service.slug}/>
      <div ref={overviewRef} className="bg-slate-50 p-4 rounded-lg shadow-lg mb-8">
        {service.featuredImage?.node && (
          <Image
            src={service.featuredImage.node.sourceUrl}
            alt={service.title}
            width={1800}
            height={600}
            className="mx-auto mb-6 rounded-lg"
            loading="lazy"
          />
        )}
        <div className="flex justify-start gap-4 mb-6 bg-slate-100">
          <p onClick={() => scrollToSection(overviewRef)} className="py-2 px-6 text-black cursor-pointer hover:text-blue-500">
            Overview
          </p>
        </div>
        <div className="service-content text-gray-700 data" dangerouslySetInnerHTML={{ __html: service.content }} />
      </div>
    </div>
  );
};

// ✅ Fetch service data from URL slug dynamically (Server-Side)
export async function getServerSideProps({ params }) {
  const client = new GraphQLClient(endpoint);

  try {
    console.log("Fetching data for Slug:", params.slug);

    const data = await client.request(GET_SERVICE_BY_SLUG, { slug: params.slug });

    console.log("GraphQL Response:", data);

    return {
      props: { service: data.ourtheme || null },
    };
  } catch (error) {
    console.error("Error fetching service:", error);
    return {
      props: { service: null, error: error.message || "Failed to fetch service data" },
    };
  }
}

export default ServiceDetails;
