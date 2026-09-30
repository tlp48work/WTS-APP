import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata={title:"WAY TO SHINE","description":"WAY TO SHINE — EDN48 & TLP48 official application"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
