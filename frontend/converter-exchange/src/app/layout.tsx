"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./global_redux/provider";
import { QueryClient, QueryClientProvider } from "react-query";
import { metadata } from "./metadata";

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <title>{String(metadata.title) ?? "Default Title"}</title>
      </head>
      <body className={inter.className}>
        {/* Ban inspect elements */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener("contextmenu", function(event) {
                event.preventDefault();
                alert("Inspect Elements Not Allowed!");
              });
            `,
          }}
        />
        <QueryClientProvider client={queryClient}>
          <Providers>
            {children}
          </Providers>
        </QueryClientProvider>
      </body>
    </html>
  );
}
