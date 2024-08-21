import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import Script from "next/script";

export const metadata: Metadata = {
  title: "ARTEMIOS",
  description: "An app to help you heal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">
        <SpeedInsights />
        <Analytics />
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-6GPPVSXJRE"></Script>
        <Script>
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-6GPPVSXJRE')`};
        </Script>
        {children}
      </body>
    </html>
  );
}
