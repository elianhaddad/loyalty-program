import type React from "react"
import { Inter } from "next/font/google"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import theme from "@/lib/theme"
import "./globals.css"
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import ClientWrapper from "@/components/client-wrapper"
import { LanguageSwitcher } from "@/components/language-switcher"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Points Management System",
  description: "Client and points management system",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <ClientWrapper session={session}>
              <header className="p-4 flex justify-end">
                <LanguageSwitcher />
              </header>
              <main style={{ padding: "20px" }}>{children}</main>
            </ClientWrapper>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
