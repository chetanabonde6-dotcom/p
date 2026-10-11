import type {Metadata} from "next";import "./globals.css";import {Shell} from "@/components/layout/shell";
export const metadata:Metadata={title:"PromptShield | Security Console",description:"Prompt injection and data exfiltration defense console"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Shell>{children}</Shell></body></html>}
