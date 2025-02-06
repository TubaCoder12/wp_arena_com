import { GraphQLClient, gql } from "graphql-request";
import Image from "next/image";
import { useEffect, useState } from "react";
import sanitizeHtml from "sanitize-html";
import SocialShare from "../BlogSocialIcons";

const GET_POST_BY_ID = gql`
  query GetPostByID($id: ID!) {
    post(id: $id, idType: DATABASE_ID) {
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
  
    const headings = Array.from(doc.querySelectorAll("h2, h3, h4, h5, h6"));
    const tocItems = headings.map((heading, index) => {
      const id = `heading-${index}`;
      return { text: heading.textContent, id, level: parseInt(heading.tagName[1]) };
    });
  
    setToc(tocItems);
    setSanitizedContent(sanitizeHtml(doc.body.innerHTML, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ['src', 'alt', 'width', 'height'],
        
      }
    }));
    
  
    setTimeout(() => {
      document.querySelectorAll("h2, h3, h4, h5, h6").forEach((heading, index) => {
        heading.id = `heading-${index}`;
      });
      console.log("Headings updated with IDs!");
    }, 1000);
    
  }, [content, setToc]);
  
  

  return (
    <div className="flex flex-row space-x-8">
      <div className="w-[95%]">
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
    <div className="mx-[400px] flex flex-row ">
      
      <div className="w-3/4">
      <h1 className="font-semibold text-5xl my-8 w-[85%]">{post.title}</h1>
        <div className="my-2">
          Last updated on
          <span className="text-blue-500"> {new Date(post.date).toLocaleDateString()}</span> by {post.author.node.name}
        </div>
        {post.featuredImage?.node && (
          <div className="w-full text-center my-4">
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
        <SocialShare slug={post.slug}/>
        <BlogContent content={post.content} setToc={setToc} />
      </div>

      <div className="w-1/4 p-4 border rounded-md shadow-md bg-white sticky top-4 h-fit my-10">
        <h2 className="font-bold text-2xl mb-4 p-2 ">jump to</h2>
        <ul className="list-none pl-0">
          {toc.map((heading) => (
            <li key={heading.id} className={`ml-${heading.level * 2}`}>
   <button
  onClick={() => {
    console.log(`Clicking on ${heading.id}`); // ID check karne ke liye
    const targetElement = document.getElementById(heading.id);
    console.log("Target Found:", targetElement);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    } else {
      console.warn(`Element with ID ${heading.id} not found!`);
    }
  }}
  className="text-gray-700 p-2 hover:text-pink-400 text-left"
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

export async function getStaticProps({ params }) {
  const client = new GraphQLClient(endpoint);
  const { id } = params;
 
  let decodedId;
  try {
    decodedId = atob(id).split(":")[1];
    console.log("Decoded ID: ", decodedId);

    const data = await client.request(GET_POST_BY_ID, { id: decodedId });

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

export async function getStaticPaths() {
  const client = new GraphQLClient(endpoint);
  const GET_ALL_POSTS = gql`
    query GetAllPosts {
      posts {
        nodes {
          id
          slug
        }
      }
    }
  `;

  try {
    const data = await client.request(GET_ALL_POSTS);
    const paths = data.posts.nodes.map((post) => ({
      params: { id: btoa(`post:${post.id}`) },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}

export default PostDetails;
