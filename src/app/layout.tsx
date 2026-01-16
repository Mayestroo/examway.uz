import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const displayFont = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "ExamWay | IELTS uchun aniq yo'l",
    template: "%s | ExamWay",
  },
  description:
    "IELTSga tayyorgarlik va mock testlar uchun platforma. Talabalar uchun kurslar, markazlar uchun standart testlar va hisobotlar.",
  openGraph: {
    title: "ExamWay | IELTS uchun aniq yo'l",
    description:
      "Kurslar, progress kuzatuvi va real mock testlar. Markazlar uchun esa standart testlar va tezkor hisobotlar.",
    type: "website",
    locale: "uz_UZ",
    siteName: "ExamWay",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
