import React, { useRef } from "react";
import { GraphQLClient, gql } from "graphql-request";
import Image from "next/image";
import Link from "next/link";
import ServiceSocial from "../ServiceSocial";

// GraphQL Query to fetch service by slug
const GET_SERVICE_BY_SLUG = gql`
  query GetServiceBySlug($slug: ID!) {
    service(id: $slug, idType: SLUG) {
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

const endpoint = "https://stg-wparena-staging.kinsta.cloud/graphql";

const ServiceDetails = ({ service, error }) => {
  if (error) return <p>Error: {error}</p>;
  if (!service) return <p>No service found.</p>;

  let acfData = {};
  try {
    acfData = JSON.parse(service.acf);
  } catch (parseError) {
    console.error("Error parsing ACF data:", parseError);
  }

  const overviewRef = useRef(null);
  const detailsRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mx-auto px-8 max-w-7xl">
      <ServiceSocial slug={service.slug} />

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
          <p onClick={() => scrollToSection(overviewRef)} className="py-2 px-6 text-black cursor-pointer hover:text-blue-500">Overview</p>
          <p onClick={() => scrollToSection(detailsRef)} className="py-2 px-6 text-black cursor-pointer hover:text-blue-500">Details</p>
        </div>
        <div className="service-content text-gray-700 data" dangerouslySetInnerHTML={{ __html: service.content }} />
      </div>

      <div ref={detailsRef} className="flex flex-wrap justify-center gap-6 my-12 bg-slate-100 p-6 rounded-lg shadow-lg">
        {["first_plan", "second_plan", "third_plan"].map((key, index) => (
          <div key={index} className="bg-white w-[350px] rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-xl font-bold bg-blue-900 text-white py-4 rounded-t-lg">{acfData[`${key}_title`]}</h3>
            <p className="text-3xl font-semibold text-pink-500 my-4">{acfData[`${key}_price`]}</p>
            <div className="text-left text-gray-700 mb-6 price" dangerouslySetInnerHTML={{ __html: acfData[`${key}_description`] }} />
            <hr className="my-4 border-gray-300" />
            <button className="border border-black text-black py-2 px-8 rounded-lg hover:bg-pink-400 hover:border-none hover:text-white">Order Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps({ params }) {
  const client = new GraphQLClient(endpoint);
  try {
    const data = await client.request(GET_SERVICE_BY_SLUG, { slug: params.slug });
    return { props: { service: data.service || null }, revalidate: 60 };
  } catch (error) {
    console.error("Error fetching service:", error);
    return { props: { service: null, error: "Failed to fetch service data" }, revalidate: 60 };
  }
}

export async function getStaticPaths() {
  const client = new GraphQLClient(endpoint);
  const GET_ALL_SERVICES = gql`
    query GetAllServices {
      services {
        nodes {
          slug
        }
      }
    }
  `;
  
  try {
    const data = await client.request(GET_ALL_SERVICES);
    const paths = data.services.nodes.map((service) => ({
      params: { slug: service.slug },
    }));
    return { paths, fallback: "blocking" };
  } catch (error) {
    console.error("Error fetching all services:", error);
    return { paths: [], fallback: "blocking" };
  }
}

export default ServiceDetails;
