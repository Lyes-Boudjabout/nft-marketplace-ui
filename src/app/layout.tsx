import { ReactNode } from "react";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import Providers from "./providers";
import Header from "@/components/Header";
import { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "NFT Marketplace",
  description: "A non-custodial, permissionless NFT Marketplace",
  icons: {
    icon: "favicon.png",
  },
};

export default function RootLayout(props: {children: ReactNode}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Providers>
          <Header/>
          {props.children}
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
