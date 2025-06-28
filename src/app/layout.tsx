import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "Lead Call Pro",
  description: "Marketplace for high-quality digital assets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Lead Call Pro</title>
        <meta
          name="description"
          content="Grow your business with more customer calls. Sign up today for our pay per call lead service to grow your business. Setup multiple online campaigns and optimize your Google My Business …"
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} font-nunito antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
