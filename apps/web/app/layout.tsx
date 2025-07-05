import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://chainwalkers.xyz";
const siteTitle = "Chainwalkers Universe";
const siteDescription =
  "Chainwalkers Universe - A crosschain game universe where you can explore, grow, and discover the secrets of the desert.";
const siteImage = `${siteUrl}/banner.png`;

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: siteTitle,
    images: [
      {
        url: siteImage,
        width: 1200,
        height: 630,
        alt: "Chainwalkers Universe Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [siteImage],
    creator: "@chainwalkers",
  },
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  alternates: {
    canonical: siteUrl,
  },
  keywords: [
    "Chainwalkers",
    "Crosschain",
    "Game",
    "Blockchain",
    "Web3",
    "Desert",
    "Explore",
    "Crypto",
    "NFT",
    "Universe",
  ],
  authors: [
    { name: "Chainwalkers Team", url: siteUrl },
  ],
  applicationName: siteTitle,
  generator: "Next.js",
  category: "game",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* SEO meta tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0eeeee" />
        <meta name="description" content={siteDescription} />
        <meta name="keywords" content="Chainwalkers, Crosschain, Game, Blockchain, Web3, Desert, Explore, Crypto, NFT, Universe" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:site_name" content={siteTitle} />
        <meta property="og:image" content={siteImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Chainwalkers Universe Banner" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDescription} />
        <meta name="twitter:image" content={siteImage} />
        <meta name="twitter:creator" content="@chainwalkers" />
        <link rel="canonical" href={siteUrl} />
        <link rel="icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
