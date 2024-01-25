import "~/styles/globals.css";

import { Inter, Nunito } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import Navbar from "./_components/navbar/Navbar";
import RentModal from "./_components/modals/RentModal";

const font = Nunito({
  subsets: ["latin-ext"],
});

export const metadata = {
  title: "House Hunter",
  description: "For all your house hunting needs",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={` font-serif ${font.className}`}>
        <TRPCReactProvider>
          <Navbar />
          <RentModal />
          <div className="">{children}</div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
