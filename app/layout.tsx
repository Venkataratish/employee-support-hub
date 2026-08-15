import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("host") ?? "localhost:3000";
  const protocol = host.includes("localhost") || host.startsWith("127.0.0.1") ? "http" : "https";
  const image = `${protocol}://${host}/og.png`;
  return {
    title: "Employee Support Hub",
    description: "One central place for payroll, benefits, attendance, safety, transportation, employee resources, and station support.",
    openGraph: { title: "Employee Resource Hub", description: "One QR. Everyday employee support.", images: [image] },
    twitter: { card: "summary_large_image", title: "Employee Resource Hub", description: "One QR. Everyday employee support.", images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={geist.variable}>{children}</body></html>;
}
