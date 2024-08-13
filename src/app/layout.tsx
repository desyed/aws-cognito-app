import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@mantine/core/styles.css';
import "./globals.css";
import ConfigureAmplifyClientSide from "./amplify-cognito-config";
import {ColorSchemeScript, createTheme, MantineProvider} from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <meta charSet="UTF-8"/>
      <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
      />
      <title>SSO</title>
      <ColorSchemeScript/>
    </head>
    <body className={inter.className}>
    <>
      <ConfigureAmplifyClientSide/>
      <MantineProvider theme={theme}>
          {children}
          </MantineProvider>
        </>
      </body>
    </html>
  );
}
