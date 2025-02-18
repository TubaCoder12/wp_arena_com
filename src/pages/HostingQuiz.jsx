import Image from "next/image";
import React from "react";

const HostingQuiz = () => {
  return (
    <section className="px-4 lg:px-12">
      <div className="bg-[#ebf1ff] flex flex-col lg:flex-row justify-center gap-[300px] items-center right-bg-custom-img relative p-6 rounded">
        {/* Image Section */}
        <div className="lg:max-w-md w-full">
          <Image 
            src="/quiz-banner.png"
            width={900}
            height={950}
            alt="Quiz Banner: Which WordPress Hosting is Best for You?" 
            className="w-full h-auto object-cover "
          />
        </div>

        {/* Content Section */}
        <div className="w-full max-w-4xl bg-no-repeat bg-contain bg-right mt-3 py-5 text-center lg:text-left">
          <h1 className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold">
            Which WordPress Hosting is Best for You?
          </h1>
          <p className="text-lg font-medium mt-4">
            Unsure which WordPress hosting company to choose? Simply answer a few questions, and our recommendation engine will identify the best option for you.
          </p>

          {/* Bullet Points */}
          <div className="mt-6 space-y-4">
            {[
              "It is a long established fact that a reader will be distracted by the readable content of a page.",
              "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            ].map((text, index) => (
              <div key={index} className="flex items-center gap-4">
                <Image 
                  src="/arrow.png"
                  width={32}
                  height={16}
                  alt="Arrow icon"
                  className="flex-shrink-0"
                />
                <p className="text-lg md:text-base font-medium">{text}</p>
              </div>
            ))}
          </div>

          {/* Call-to-Action Button */}
          <div className="mt-6 flex justify-center lg:justify-start">
            <button className="w-[170px] h-[45px] uppercase py-2 px-4 bg-gray-800 hover:bg-[#2980b9] font-semibold rounded text-white transition duration-300">
              Take the quiz
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostingQuiz;
