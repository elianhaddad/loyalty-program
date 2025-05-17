"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { setLocale, getLocale } from "@/lib/i18n"

export function LanguageSwitcher() {
  const [locale, setCurrentLocale] = useState<"es" | "en">("es")

  useEffect(() => {
    // Load language preference from localStorage when component mounts
    const savedLocale = localStorage.getItem("preferredLanguage")
    if (savedLocale === "es" || savedLocale === "en") {
      setLocale(savedLocale)
      setCurrentLocale(savedLocale)
    } else {
      // If no saved preference, use the current locale from i18n
      setCurrentLocale(getLocale())
    }
  }, [])

  const toggleLocale = () => {
    const newLocale = locale === "es" ? "en" : "es"

    // Save to localStorage
    localStorage.setItem("preferredLanguage", newLocale)

    // Update the app's locale
    setLocale(newLocale)
    setCurrentLocale(newLocale)

    // Force a re-render of the page
    window.location.reload()
  }

  return (
    <Button variant="outline" size="sm" onClick={toggleLocale}>
      {locale === "es" ? "English" : "Español"}
    </Button>
  )
}
