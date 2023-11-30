import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Headers from "@/components/Headers";
import { ThemeProvider } from "@/components/ThemeProvider";
import ClientProviders from "@/components/ClientProviders";
import FirebaseAuthProvider from "@/components/FirebaseAuthProvider";
import SubscriptionProvider from "@/components/SubscriptionProvider";
import { Toaster } from "@/components/ui/toaster";
import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata();

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClientProviders>
            <html lang="en">
                <body className="flex flex-col min-h-screen overflow-x-hidden">
                    <FirebaseAuthProvider>
                        <SubscriptionProvider>
                            <ThemeProvider
                                attribute="class"
                                defaultTheme="system"
                                enableSystem
                                disableTransitionOnChange
                            >
                                <Headers />
                                {children}
                                <Toaster />
                            </ThemeProvider>
                        </SubscriptionProvider>
                    </FirebaseAuthProvider>
                </body>
            </html>
        </ClientProviders>
    );
}
