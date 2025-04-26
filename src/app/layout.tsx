export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/common/Navbar";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Naimdotcom Job Board",
    template: "%s | Naimdotcom Job Board",
  },
  description:
    "Find your dream job from thousands of listings. Apply easily through the Naimdotcom job portal.",
  keywords: [
    "Job Board",
    "Find Jobs",
    "Career Opportunities",
    "Remote Jobs",
    "Full-time Jobs",
    "Naimdotcom",
  ],
  authors: [{ name: "Naim Akter", url: "https://github.com/naimdotcom" }],
  creator: "Naim Islam",
  metadataBase: new URL("https://naimdotcom-job-board.vercel.app"),
  openGraph: {
    title: "Naimdotcom Job Board",
    description:
      "Explore top companies and find your next career move on the Naimdotcom Job Board.",
    url: "https://naimdotcom-job-board.vercel.app",
    siteName: "Naimdotcom Job Board",
    images: [
      {
        url: "https://naimdotcom-job-board.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Naimdotcom Job Board",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naimdotcom Job Board",
    description:
      "Find the best job opportunities easily with the Naimdotcom platform.",
    images: ["https://naimdotcom-job-board.vercel.app/og-image.png"],
    creator: "@yourTwitterHandle", // (Optional if you have a twitter handle)
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute={"class"}
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
          <Toaster position="top-left" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
