import "~/styles/globals.css";

import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import Header from "~/components/Headers";

const inter = Poppins({
  subsets: ["devanagari"],
  variable: "--font-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Pollglot",
  description: "Translate it with AI",
  icons: [{ rel: "icon", url: "/parrot.png" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <Toaster position="top-center" closeButton richColors />
        <Header />
        {children}
      </body>
    </html>
  );
}
