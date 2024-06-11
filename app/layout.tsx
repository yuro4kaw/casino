import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/Header";
import ClientProvider from "@/app/ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MonoCasino",
  description: "Lucky Casino",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientProvider>
          <Header />
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}