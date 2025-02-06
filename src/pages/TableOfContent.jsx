import React, { useEffect, useState } from "react";

const BlogContent = ({ content }) => {
  const [toc, setToc] = useState([]);
  const [parsedContent, setParsedContent] = useState("");

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");

    // Extract only headings (h2, h3, h4) that do not contain <a> tags
    const headings = Array.from(doc.querySelectorAll("h2, h5, h6"))
      .filter(heading => !heading.querySelector("a")); // This will filter out headings with <a> tags

    const tocItems = headings.map((heading, index) => {
      const id = `heading-${index}`;
      heading.id = id; // Add id to the heading for navigation
      return {
        text: heading.textContent,  // Text of the heading
        id,
        level: parseInt(heading.tagName[1]), // Get heading level (h2 -> 2, h3 -> 3, etc.)
      };
    });

    setToc(tocItems);
    setParsedContent(doc.body.innerHTML); // Save the parsed content with added ids
  }, [content]);

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex space-x-8 p-8">
      <div className="max-w-7xl top-11" dangerouslySetInnerHTML={{ __html: parsedContent }} />
      <div className="p-4 border rounded-md shadow-md bg-white w-[900px] sticky top-4 bottom-[-100] h-fit">
        <h2 className="font-bold text-lg mb-2">Table of Contents</h2>
        <ul className="list-none pl-0">
          {toc.map((heading) => (
            <li
              key={heading.id}
              className={`ml-${heading.level === 3 ? "4" : heading.level === 4 ? "8" : "0"}`}
            >
              <button
                onClick={() => handleScroll(heading.id)} // Add onClick handler
                className="text-black hover:underline font-bold p-2 hover:text-blue-500  "
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

export default BlogContent;
