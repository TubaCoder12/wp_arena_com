import "@/styles/globals.css";
import Navbar2 from "./Navbar2";
import Navbar from "./Navbar";

export default function App({ Component, pageProps }) {
  return (
    <>
    <Navbar/>
      <Navbar2 /> {/* ✅ Ab ye sahi tarike se render hoga */}
      <Component {...pageProps} />
    </>
  );
}
