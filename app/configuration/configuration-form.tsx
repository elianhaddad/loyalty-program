"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TextField, Button, Box, Grid, Alert, CircularProgress, Typography, Card, CardContent } from "@mui/material"
import { updateConfigurations } from "@/lib/actions/configuration-actions"

interface Configuration {
  _id?: string
  dayOfWeek: string
  conversionRate: number
}

interface ConfigurationFormProps {
  initialConfigurations: Configuration[]
}

export default function ConfigurationForm({ initialConfigurations }: ConfigurationFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Initialize with default values for all days if not provided
  const defaultDays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]

  const initialConfig = defaultDays.map((day) => {
    const existing = initialConfigurations.find((c) => c.dayOfWeek === day)
    return {
      dayOfWeek: day,
      conversionRate: existing ? existing.conversionRate : 1,
      _id: existing?._id,
    }
  })

  const [configurations, setConfigurations] = useState<Configuration[]>(initialConfig)

  const handleRateChange = (dayOfWeek: string, value: string) => {
    const rate = Number.parseFloat(value) || 0
    setConfigurations((prev) =>
      prev.map((config) => (config.dayOfWeek === dayOfWeek ? { ...config, conversionRate: rate } : config)),
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      await updateConfigurations(configurations)
      setSuccess("Configuration updated successfully")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const getDayName = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1)
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Typography variant="h6" gutterBottom>
        Points Conversion Rates
      </Typography>

      <Typography variant="body2" color="text.secondary" paragraph>
        Set how many points a client earns for each Argentine Peso spent on different days of the week.
      </Typography>

      <Grid container spacing={3}>
        {configurations.map((config) => (
          <Grid item xs={12} sm={6} md={4} key={config.dayOfWeek}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {getDayName(config.dayOfWeek)}
                </Typography>
                <TextField
                  fullWidth
                  label="Points per ARS"
                  type="number"
                  value={config.conversionRate}
                  onChange={(e) => handleRateChange(config.dayOfWeek, e.target.value)}
                  inputProps={{
                    step: "0.1",
                    min: "0",
                  }}
                  disabled={loading}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          Save Configuration
        </Button>
      </Box>
    </form>
  )
}
