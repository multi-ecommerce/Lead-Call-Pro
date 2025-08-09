import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";
import Script from "next/script";

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
  title: "Exclusive Pay-Per-Call Leads for Service Professionals",
  description:
    "Grow your business with more customer calls. Sign up today for our pay per call lead service to grow your business. Setup multiple online campaigns and optimize your Google My Business …",
  // openGraph: {
  //   title: "Lead Call Pro – Pay Per Call Leads",
  //   description:
  //     "Sign up today for pay-per-call leads and boost your business.",
  //   url: "https://leadcallpro.com",
  //   siteName: "Lead Call Pro",
  //   images: [
  //     {
  //       url: "",
  //       width: 1200,
  //       height: 630,
  //     },
  //   ],
  //   locale: "en_US",
  //   type: "website",
  // },
  keywords: [
    "Lead Call Pro",
    "Pay per call leads",
    "Pay per call lead service",
    "pay per call",
    "marketing",
    "pay per call lead generation",
    "buy pay per call leads",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics tag */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=G-T3C5G702QK`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-T3C5G702QK');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} font-nunito antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
