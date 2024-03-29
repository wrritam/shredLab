import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const plusJakartaSans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shred Lab | Version Control of Your Workouts",
  description: "Workouts you can frok, clone and contribute with rest of the world",
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
