import React from "react";
import StyledComponentsRegistry from "../lib/registry";
import "./globals.css";
import { Header } from "./ui/header";

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
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
