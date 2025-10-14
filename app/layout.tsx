import React from "react";
import StyledComponentsRegistry from "../lib/registry";
import "./globals.css";
import { Header } from "./ui/header";
import { SessionProvider } from "./lib/context/SessionContext";

export const metadata = {
  title: "Brenda Recipes",
  description: "Brenda's Favorite Recipes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <SessionProvider>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </SessionProvider>
      </body>
    </html>
  );
}
