"use client"

import { useState } from "react"
import { Typography, Box, Paper, Button, Alert, CircularProgress } from "@mui/material"
import Link from "next/link"
import { t } from 'i18n';

export default function SetupPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleSetup = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/setup")
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        message: t('setupPage.error.unexpected'),
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 600, width: "100%", textAlign: "center" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('setupPage.title')}
        </Typography>

        <Typography variant="body1" paragraph>
          {t('setupPage.description')}
        </Typography>

        {result && (
          <Alert severity={result.success ? "success" : "error"} sx={{ mb: 3, textAlign: "left" }}>
            {result.message}
          </Alert>
        )}

        <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
          {!result?.success ? (
            <Button
              variant="contained"
              onClick={handleSetup}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : null}
            >
              {loading ? t('setupPage.button.setup.progress') : t('setupPage.button.setup')}
            </Button>
          ) : (
            <Button variant="contained" component={Link} href="/auth/login">
              {t('setupPage.button.login')}
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  )
}
