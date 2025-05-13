"use client"

import type React from "react"

import { SessionProvider } from "next-auth/react"
import Navbar from "@/components/navbar"

export default function ClientWrapper({ children, session }: { children: React.ReactNode; session: any }) {
  return (
    <SessionProvider session={session}>
      <Navbar />
      {children}
    </SessionProvider>
  )
}
