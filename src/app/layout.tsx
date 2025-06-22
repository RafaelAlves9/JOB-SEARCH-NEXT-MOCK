import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";

export const robotoRegular = Roboto({
   subsets: ["latin"],
   weight: "400",
   variable: "--font-roboto-regular",
   display: "swap",
});

export const robotoMedium = Roboto({
   subsets: ["latin"],
   weight: "500",
   variable: "--font-roboto-medium",
   display: "swap",
});

export const robotoBold = Roboto({
   subsets: ["latin"],
   weight: "700",
   variable: "--font-roboto-bold",
   display: "swap",
});

export const metadata: Metadata = {
   title: "Desvios",
   description: "Desenvolvido por X-BITS SOFTWARE",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="pt-BR" suppressHydrationWarning>
         <body
            className={`${robotoRegular.variable} ${robotoMedium.variable} ${robotoBold.variable} antialiased`}
         >
            <ToastContainer />
            {children}
         </body>
      </html>
   );
}
