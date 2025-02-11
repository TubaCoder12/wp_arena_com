import React, { useRef } from "react";
import { GraphQLClient, gql } from "graphql-request";
import Image from "next/image";
import Link from "next/link";

import ServiceSocial from "../ServiceSocial";

// GraphQL Query
const GET_SERVICE_BY_ID = gql`
  query GetServiceByID($id: ID!) {
    service(id: $id, idType: DATABASE_ID) {
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

  // Parsing ACF data
  let acfData = {};
  try {
    acfData = JSON.parse(service.acf);
  } catch (parseError) {
    console.error("Error parsing ACF data:", parseError);
  }

  // Refs for scrolling
  const overviewRef = useRef(null);
  const detailsRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mx-auto px-8 max-w-7xl">
      {/* Navbar */}
    

    <ServiceSocial slug={service.slug}/>

      {/* Overview Section */}
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
         {/* Table of Contents */}
      <div className="flex justify-start gap-4 mb-6 bg-slate-100">
      <p
  onClick={() => scrollToSection(overviewRef)}
  className="py-2 px-6 text-black cursor-pointer hover:text-blue-500"
>
  Overview
</p>
<p
  onClick={() => scrollToSection(detailsRef)}
  className="py-2 px-6 text-black cursor-pointer hover:text-blue-500"
>
  Details
</p>

      </div>
        <div
          className="service-content text-gray-700 data"
          dangerouslySetInnerHTML={{ __html: service.content }}
        />
      </div>

      {/* Pricing Plans Section */}
      <div ref={detailsRef} className="flex flex-wrap justify-center gap-6 my-12 bg-slate-100 p-6 rounded-lg shadow-lg">
        {[
          { title: acfData.first_plan_title, price: acfData.first_plan_price, desc: acfData.first_plan_description },
          { title: acfData.second_plan_title, price: acfData.second_plan_price, desc: acfData.second_plan_description },
          { title: acfData.third_plan_title, price: acfData.third_plan_price, desc: acfData.third_plan_description },
        ].map((plan, index) => (
          <div key={index} className="bg-white w-[350px] rounded-lg shadow-lg p-6 text-center">
            <h3 className="text-xl font-bold bg-blue-900 text-white py-4 rounded-t-lg">{plan.title}</h3>
            <p className="text-3xl font-semibold text-pink-500 my-4">{plan.price}</p>
            <div
              className="text-left text-gray-700 mb-6 price"
              dangerouslySetInnerHTML={{ __html: plan.desc }}
            />
            <hr className="my-4 border-gray-300" />
            <button className="border border-black text-black py-2 px-8 rounded-lg hover:bg-pink-400 hover:border-none hover:text-white">
              Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getStaticProps({ params }) {
  const client = new GraphQLClient(endpoint);
  const { id } = params;
  let decodedId;
  try {
    decodedId = atob(id).split(":")[1];
    console.log("Decoded ID:", decodedId);
    const data = await client.request(GET_SERVICE_BY_ID, { id: decodedId });
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
          id
          slug
        }
      }
    }
  `;
  
  try {
    const data = await client.request(GET_ALL_SERVICES);
    const paths = data.services.nodes.map((service) => ({
      params: { id: btoa(`service:${service.id}`) },
    }));
    return { paths, fallback: "blocking" };
  } catch (error) {
    console.error("Error fetching all services:", error);
    return { paths: [], fallback: "blocking" };
  }
}

export default ServiceDetails;
