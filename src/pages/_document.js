import { Html, Head, Main, NextScript } from "next/document";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Navbar2 from "./Navbar2";
import Footer from "./Footer";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="antialiased">
         <Navbar />
              <Navbar2/>
        <Main />
    
        <NextScript />
        <Footer/>
      </body>
    </Html>
  );
}
