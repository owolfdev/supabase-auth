import { GeistSans } from "geist/font/sans";
import "./globals.css";
import NavBar from "@/components/Navbar";
import Footer from "@/components/Footer";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Supabase Authentication and Next.js",
  description: "Authentication example app with Supabase Auth and Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex flex-col items-center">
          <NavBar />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
