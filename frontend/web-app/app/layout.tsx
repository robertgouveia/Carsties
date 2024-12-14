import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/app/nav/Navbar";

export const metadata: Metadata = {
  title: "Carsties",
  description: "Auction Site for Vehicles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar/>
        <main className="container mx-auto px-5 pt-10 ">
            {children}
        </main>
      </body>
    </html>
  );
}
