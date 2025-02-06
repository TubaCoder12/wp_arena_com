import { gql } from "@apollo/client";
import client from "./Apollo";

import FeaturedPost from "@/Component/FeaturedPost";
import PostList from "@/Component/PostList";
import CategoryList  from "@/Component/CategoryList";
import PopularPosts from "@/Component/PopularPosts";

import Routes from "./Routes";
import HostingQuiz from "./HostingQuiz";
import Footer from "./Footer";
import { useState } from "react";

export async function getStaticProps() {
  const postsQuery = client.query({
    query: gql`
      query {
        page(id: "69936", idType: DATABASE_ID) {
          title
          rankMathFocusKeyword
          rankMathSEOScore
          rankMathDescription
          rankMathTitle
        }
      }
    `,
  });

  const categoriesQuery = client.query({
    query: gql`
      query GetPostsByCategory($categoryId: Int!) {
        posts(where: { categoryId: $categoryId }) {
          nodes {
            id
            slug
            title
            date
            excerpt
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            author {
              node {
                name
              }
            }
          }
        }
      }
    `,
    variables: { categoryId: 9 },  // Example categoryId (you can change this dynamically)
  });
  
  const NewsPostQuery = client.query({
    query: gql`
      query GetPostsByCategory($categoryId: Int!) {
        posts(where: { categoryId: $categoryId }) {
          nodes {
            id
            slug
            title
            date
            excerpt
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            author {
              node {
                name
              }
            }
          }
        }
      }
    `,
    variables: { categoryId: 990 },  // Example categoryId (you can change this dynamically)
  });

  
  const LatestPostQuery = client.query({
    query: gql`
      query GetAllPosts {
    posts {
      nodes {
        id
        slug
        title
        date
        excerpt
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        author {
          node {
            name
          }
        }
      }
    }
  }
    `,
     // Example categoryId (you can change this dynamically)
  });
  const featuredPostQuery = client.query({
    query: gql`
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
    `,
  });

  const popularPostsQuery = client.query({
    query: gql`
      query GetPopularPosts {
        services {
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
    `,
  });
  
  

  // Parallel fetching
  const [posts, categories, featuredPost, popularPosts ,NewsPosts,LatestPost] = await Promise.all([
    postsQuery,
    categoriesQuery,
    featuredPostQuery,
    popularPostsQuery,
    NewsPostQuery,
    LatestPostQuery
  ]);

  return {
    props: {
      pageData: posts.data.page, // Pass page data here
      categories: categories.data.posts.nodes || [],
      featuredPost: featuredPost.data.deals.nodes,
      popularPosts: popularPosts.data.services.nodes || [],
      NewsPosts: NewsPosts.data.posts.nodes || [],
      LatestPost:LatestPost.data.posts.nodes|| []
    },
    revalidate: 60, // ISR every 60 seconds
  };
}
export default function Home({ pageData, categories, featuredPost, popularPosts,NewsPosts,LatestPost }) {
 

const [activeRoute, setActiveRoute] = useState("Latest");
const handleRouteClick = (route) => {
  setActiveRoute(route);
};
  return (
    <>
     
        <PostList pageData={pageData} />
        <Routes onRouteClick={handleRouteClick}  />
        {activeRoute === "Reviews" && <CategoryList categories={categories} />}
        {activeRoute === "News" && <CategoryList categories={NewsPosts} />}
        {activeRoute === "Latest" && <CategoryList categories={LatestPost} />}
        <HostingQuiz/>
        <FeaturedPost posts={featuredPost} />
        <PopularPosts services={popularPosts} />
       
    </>
  );
}
