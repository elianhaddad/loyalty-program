import type React from "react"
import { Inter } from "next/font/google"
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import { SessionProvider } from "next-auth/react"
import theme from "@/lib/theme"
import Navbar from "@/components/navbar"
import "./globals.css"
import { auth } from "@/auth"

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
  const session = await auth()

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <AppRouterCacheProvider>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Navbar />
              <main style={{ padding: "20px" }}>{children}</main>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
