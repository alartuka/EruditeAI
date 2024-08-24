import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Navbar from "./Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EruditeSpark AI",
  description: "The easiest way to create flashcards from your text",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="lg" />

        {/* <!-- Google tag (gtag.js) --> */}
        {/* <script async strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}></script>
        
        <script id="ga-script" strategy="lazyOnload">
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

          gtag('config', `${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`);
        </script> */}
        
      </head>

        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
