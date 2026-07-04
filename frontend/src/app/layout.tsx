import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const grotesk = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Confiance Services: Workforce Deployment Platform",
  description:
    "Confiance Services recruits, trains, and deploys skilled & unskilled labor across hospitality, facilities, construction, and logistics. Hire trained hands in days.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${grotesk.variable} font-sans bg-white`}>
        {children}
      </body>
    </html>
  );
}
