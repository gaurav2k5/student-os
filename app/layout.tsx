import { ClerkProvider } from '@clerk/nextjs'
import "./globals.css";

export const metadata = {
  title: "StudentOS",
  description: "The AI Operating System for Students",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body className="bg-zinc-950 text-zinc-50 antialiased">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}