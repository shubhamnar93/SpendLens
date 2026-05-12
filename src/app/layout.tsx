import type { Metadata } from "next";
import "./globals.css";
import { TRPCReactProvider } from '@/trpc/client';
import { Headers } from "@/components/Headers";

export const metadata: Metadata = {
  icons: {
    icon: "/logo.svg",
  },
  title: 'SpendLens AI Spend Audit',
  description: 'Run a fast AI spend audit and get recommendations for plan optimization.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>
          <Headers />
          <main>
            {children}
          </main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
