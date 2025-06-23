import { ConvexClientProvider } from "@/components/convex-client-provider";
import "./globals.css";
import Header from "@/components/header";
import {Inter} from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs";
import SyncUserToConvex from "@/components/SyncUserToConvex";
const inter=Inter({subsets:["latin"]});

export const metadata = {
  title: "WelthCircle",
  description: "The smartest way to split expenses with friends",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        <ClerkProvider>
 
        <ConvexClientProvider>
        <SyncUserToConvex/>
       
        <Header/>
        <main className="min-h-screen">{children}</main>
         </ConvexClientProvider>
       </ClerkProvider>
      </body>
    </html>
  );
}
