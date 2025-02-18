import { GraphQLClient, gql } from "graphql-request";
import Image from "next/image";
import { useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";
import SocialShare from "../BlogSocialIcons";

const GET_POST_BY_ID = gql`
  query GetPostByID($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      author {
        node {
          name
        }
      }
      date
      slug
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
      categories {
        nodes {
          name
        }
      }
    }
  }
`;

const endpoint = "https://stg-wparena-staging.kinsta.cloud/graphql";

const BlogContent = ({ content, setToc }) => {
  const [sanitizedContent, setSanitizedContent] = useState("");

  useEffect(() => {
    if (!content) return;

    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    // Extract headings and assign unique IDs
    const headings = Array.from(doc.querySelectorAll("h2, h3,h4,h5,h6"));
    const tocItems = [];

    headings.forEach((heading, index) => {
      const id = `heading-${index}`;
      heading.setAttribute("id", id); // Correct way to set ID
      tocItems.push({ text: heading.textContent, id, level: parseInt(heading.tagName[1]) });
    });

    // Ensure sanitized content includes these IDs
    setSanitizedContent(
      sanitizeHtml(doc.body.innerHTML, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img"]),
        allowedAttributes: {
          ...sanitizeHtml.defaults.allowedAttributes,
          img: ["src", "alt", "width", "height"],
          h2: ["id"],
          h3: ["id"],
          h4: ["id"],
          h5: ["id"],
          h6: ["id"],
         
         
        },
      })
    );

    setToc(tocItems);
  }, [content, setToc]);

  return (
    <div className="flex flex-row space-x-8">
      <div className="w-[95%] ">
        <div className="custom" dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      </div>
    </div>
  );
};

const PostDetails = ({ post, error }) => {
  const [toc, setToc] = useState([]);

  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>No post found.</p>;

  return (
    <div className="lg:mx-[400px] mx-[200px] flex flex-row">
      <div className="w-3/4">
        <h1 className="font-bold text-4xl my-14 w-[85%] leading-tight">{post.title}</h1>
        
        {post.featuredImage?.node && (
          <div className="w-full text-center my-3">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText}
              width={800}
              height={400}
              className="object-cover rounded-md "
              loading="lazy"
            />
          </div>
        )}
        <h1 className="text-[11px] italic text-[#444]">{post.title}</h1>
        <SocialShare slug={post.slug} />
        <BlogContent content={post.content} setToc={setToc} />
      </div>

      {/* Sidebar with Table of Contents */}
      <div className="w-1/4 p-4 border rounded-md shadow-md bg-white sticky top-4 h-fit my-10">
        <h2 className="font-bold text-2xl mb-4 p-2 ">jump to</h2>
        <ul className="list-none pl-0">
  {toc.map((heading) => (
    <li key={heading.id} className="text-left"> {/* Ensure left alignment */}
      <button
        onClick={() => {
          console.log(`Clicking on ${heading.id}`);
          const targetElement = document.getElementById(heading.id);
          console.log("Target Found:", targetElement);

          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
          } else {
            console.warn(`Element with ID ${heading.id} not found!`);
          }
        }}
        className="text-gray-700  hover:text-pink-400 text-left w-full text-[16px] leading-4 mb-[12px]"
      >
        {heading.text}
      </button>
    </li>
  ))}
</ul>

      </div>
    </div>
  );
};

// Static Props for SSR
export async function getStaticProps({ params }) {
  const client = new GraphQLClient(endpoint);
  const { slug } = params;

  try {
    const data = await client.request(GET_POST_BY_ID, { slug });

    return {
      props: { post: data.post || null },
      revalidate: 60,
    };
  } catch (error) {
    console.error("Error fetching post:", error);
    return {
      props: { post: null, error: "Failed to fetch post data" },
      revalidate: 60,
    };
  }
}

// Static Paths
export async function getStaticPaths() {
  const client = new GraphQLClient(endpoint);
  const GET_ALL_POSTS = gql`
    query GetAllPosts {
      posts {
        nodes {
          slug
        }
      }
    }
  `;

  try {
    const data = await client.request(GET_ALL_POSTS);

    if (!data?.posts?.nodes) {
      console.error("No posts found");
      return { paths: [], fallback: "blocking" };
    }

    const paths = data.posts.nodes.map((post) => ({
      params: { slug: post.slug },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

export default PostDetails;
