import type { Metadata } from "next";
import "./globals.css";
// import { ReduxProvider } from "@/redux/Provider";


export const metadata: Metadata = {
  title: "Dashboard",
  description: "Built by Kennytech",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={`antialiased`}>
            {/* <ReduxProvider> */}
               {children}
            {/* </ReduxProvider> */}
        </body> 
    </html>
  );
}
