import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/theme"
import MainNav from "@/components/ui/nav/main-nav";
import  ResumeProvider  from '@/context/resume'
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ai Resume Builder",
  description: "Free opensource Ai powered resume assistant.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          >
            <ResumeProvider>
              <MainNav />
              {children}
              </ResumeProvider>
            </ThemeProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}
