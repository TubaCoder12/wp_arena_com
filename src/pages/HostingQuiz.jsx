export default function HostingQuiz() {
    return (
      <div
        className="relative bg-cover bg-center bg-no-repeat p-12 md:p-16 rounded-lg mx-12"
        style={{
          backgroundImage: "url('/2.jfif')", // Static background image
          backgroundPosition: "center",
        }}
      >
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center md:flex-row md:items-start">
          {/* Illustration (Replace with an actual image if needed) */}
          <div className="flex-1 flex justify-center">
            {/* Add your image here if needed */}
          </div>
  
          {/* Text Section */}
          <div className="flex-1 mt-8 md:mt-0 md:ml-8 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Which WordPress Hosting is Best for You?
            </h2>
            <p className="text-gray-600">
              Unsure which WordPress hosting company to choose? Simply answer a
              few questions, and our recommendation engine will identify the best
              option for you.
            </p>
            <ul className="mt-4 text-gray-600 space-y-2">
              <li>
                <span className="text-blue-500 font-extrabold">→</span> It is a
                long established fact that a reader...
              </li>
              <li>
                <span className="text-blue-500 font-extrabold">→</span> Lorem
                Ipsum is simply dummy text...
              </li>
            </ul>
            <button className="mt-6 bg-black text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700">
              Take the Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }
  