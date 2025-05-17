"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { TextField, Button, Box, Grid, Alert, CircularProgress, Autocomplete, Typography } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { createRedemption } from "@/lib/actions/transaction-actions"
import { getClients } from "@/lib/actions/client-actions"
import { t } from "@/lib/i18n"

interface Client {
  _id: string
  dni: string
  fullName: string
  totalPoints: number
}

export default function RedemptionForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [clients, setClients] = useState<Client[]>([])
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)

  const [formData, setFormData] = useState({
    clientId: "",
    points: "",
    date: new Date(),
    details: "",
  })

  useEffect(() => {
    const loadClients = async () => {
      try {
        const clientsData = await getClients()
        setClients(clientsData)
      } catch (err) {
        setError("Failed to load clients")
      }
    }

    loadClients()
  }, [])

  const handleClientChange = (event: any, newValue: Client | null) => {
    setSelectedClient(newValue)
    setFormData((prev) => ({
      ...prev,
      clientId: newValue?._id || "",
    }))
  }

  const handleDateChange = (newDate: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      date: newDate || new Date(),
    }))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (!formData.clientId) {
        throw new Error("Please select a client")
      }

      if (!formData.points || isNaN(Number.parseInt(formData.points))) {
        throw new Error("Please enter a valid points amount")
      }

      const pointsToRedeem = Number.parseInt(formData.points)

      if (selectedClient && pointsToRedeem > selectedClient.totalPoints) {
        throw new Error(`Client only has ${selectedClient.totalPoints} points available`)
      }

      await createRedemption({
        clientId: formData.clientId,
        points: pointsToRedeem,
        date: formData.date,
        details: formData.details,
      })

      router.push("/clients")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          <Grid item xs={12} minWidth="350px">
            <Autocomplete
              id="client-select"
              options={clients}
              getOptionLabel={(option) => `${option.fullName} (DNI: ${option.dni})`}
              onChange={handleClientChange}
              renderInput={(params) => <TextField {...params} required label={t("redemptionForm.selectClient")} variant="outlined" />}
              disabled={loading}
            />
          </Grid>

          {selectedClient && (
            <Grid item xs={12}>
              <Box
                sx={{
                  p: 2,
                  bgcolor: "info.light",
                  color: "info.contrastText",
                  borderRadius: 1,
                }}
              >
                <Typography variant="subtitle1">
                  {t("redemptionForm.availablePoints")} <strong>{selectedClient.totalPoints}</strong>
                </Typography>
              </Box>
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              label={t("redemptionForm.pointsToRedeem")}
              name="points"
              type="number"
              value={formData.points}
              onChange={handleChange}
              disabled={loading}
              error={selectedClient && Number.parseInt(formData.points) > selectedClient.totalPoints}
              helperText={
                selectedClient && Number.parseInt(formData.points) > selectedClient.totalPoints
                  ? t("redemptionForm.error.exceedsPoints")
                  : ""
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <DatePicker
              label={t("common.date")}
              value={formData.date}
              onChange={handleDateChange}
              slotProps={{ textField: { fullWidth: true } }}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} minWidth="300px">
            <TextField
              required
              sx={{minWidth: "400px" }}
              fullWidth
              label={t("redemptionForm.details")}
              name="details"
              value={formData.details}
              onChange={handleChange}
              multiline
              rows={3}
              placeholder={t("redemptionForm.details.placeholder")}
              disabled={loading}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" onClick={() => router.back()} disabled={loading}>
            {t("common.cancel")}
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading || (selectedClient && Number.parseInt(formData.points) > selectedClient.totalPoints)}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {t("redemptionForm.record")}
          </Button>
        </Box>
      </form>
    </LocalizationProvider>
  )
}
