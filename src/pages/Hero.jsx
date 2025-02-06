import { gql } from '@apollo/client';
import client from './Apollo';

// GraphQL query to fetch page data
const GET_PAGE_DATA = gql`
  query {
    page(id: "69936", idType: DATABASE_ID) {
      title
      rankMathFocusKeyword
      rankMathSEOScore
      rankMathDescription
      rankMathTitle
    }
  }
`;

const Hero = ({ pageData }) => {
  return (
    <div className="relative h-[400px] bg-cover bg-center bg-no-repeat bg-[url('/heroImage.jfif')]">
      <div className="absolute inset-0 flex items-center">
        <div className="ml-36 text-white max-w-lg">
          {!pageData ? (
            <p className="text-black">Error fetching data</p>
          ) : (
            <>
              <h1 className="text-4xl font-bold mb-4 text-black">
                {pageData?.title || 'Default Title'}
              </h1>
              <p className="text-lg mb-6 text-black">
                {pageData?.rankMathDescription || 'Default Description'}
              </p>
            </>
          )}

          {/* Form for email input */}
          <form className="flex">
            <input
              type="email"
              placeholder="Email: *"
              className="px-4 py-2 rounded-l-md w-[350px] border focus:outline-none text-black"
            />
            <button type="submit" className="bg-black text-white px-6 py-2 rounded-r-md font-bold">
              START NOW
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// getServerSideProps function to fetch data on each request
export async function getServerSideProps() {
  console.log('getServerSideProps is running...');

  try {
    const { data } = await client.query({
      query: GET_PAGE_DATA,
    });

    console.log('API Response:', JSON.stringify(data, null, 2));

    return {
      props: {
        pageData: data?.page || null,
      },
    };
  } catch (error) {
    console.error('Error in fetching data:', error.message);
    return {
      props: {
        pageData: null,
      },
    };
  }
}

export default Hero;
