"use client";

import "./globals.css";
import { ApolloProvider } from "@apollo/client";  // Apollo Client importieren
import client from "../apollo-client";  // Apollo Client Konfiguration importieren



export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
        </body>
        </html>
    );
}
