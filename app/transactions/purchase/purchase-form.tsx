"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  TextField,
  Button,
  Box,
  Grid,
  Alert,
  CircularProgress,
  Autocomplete,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Typography,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { createPurchase } from "@/lib/actions/transaction-actions"
import { getClients } from "@/lib/actions/client-actions"
import { getPointsRate } from "@/lib/actions/configuration-actions"

interface Client {
  _id: string
  dni: string
  fullName: string
}

export default function PurchaseForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [clients, setClients] = useState<Client[]>([])
  const [pointsRate, setPointsRate] = useState<number>(1)
  const [calculatedPoints, setCalculatedPoints] = useState<number>(0)

  const [formData, setFormData] = useState({
    clientId: "",
    amount: "",
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

  useEffect(() => {
    const loadPointsRate = async () => {
      if (formData.date) {
        try {
          const dayOfWeek = new Date(formData.date).toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()
          const rate = await getPointsRate(dayOfWeek)
          setPointsRate(rate)

          // Calculate points based on amount and rate
          if (formData.amount) {
            const points = Math.floor(Number.parseFloat(formData.amount) * rate)
            setCalculatedPoints(points)
          }
        } catch (err) {
          console.error("Failed to load points rate", err)
        }
      }
    }

    loadPointsRate()
  }, [formData.date, formData.amount])

  const handleClientChange = (event: any, newValue: Client | null) => {
    setFormData((prev) => ({
      ...prev,
      clientId: newValue?._id || "",
    }))
  }

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = e.target.value
    setFormData((prev) => ({ ...prev, amount }))

    if (amount && pointsRate) {
      const points = Math.floor(Number.parseFloat(amount) * pointsRate)
      setCalculatedPoints(points)
    } else {
      setCalculatedPoints(0)
    }
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

      if (!formData.amount || isNaN(Number.parseFloat(formData.amount))) {
        throw new Error("Please enter a valid amount")
      }

      await createPurchase({
        clientId: formData.clientId,
        amount: Number.parseFloat(formData.amount),
        date: formData.date,
        points: calculatedPoints,
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
          <Grid item xs={12}>
            <Autocomplete
              id="client-select"
              options={clients}
              getOptionLabel={(option) => `${option.fullName} (DNI: ${option.dni})`}
              onChange={handleClientChange}
              renderInput={(params) => <TextField {...params} required label="Select Client" variant="outlined" />}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth required>
              <InputLabel htmlFor="amount">Amount</InputLabel>
              <OutlinedInput
                id="amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleAmountChange}
                startAdornment={<InputAdornment position="start">ARS</InputAdornment>}
                label="Amount"
                disabled={loading}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <DatePicker
              label="Date"
              value={formData.date}
              onChange={handleDateChange}
              slotProps={{ textField: { fullWidth: true } }}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Details (Optional)"
              name="details"
              value={formData.details}
              onChange={handleChange}
              multiline
              rows={2}
              disabled={loading}
            />
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                p: 2,
                bgcolor: "primary.light",
                color: "primary.contrastText",
                borderRadius: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1">
                Points Rate for {formData.date.toLocaleDateString("en-US", { weekday: "long" })}: {pointsRate}
              </Typography>
              <Typography variant="h5" sx={{ mt: 1 }}>
                Points to be earned: {calculatedPoints}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" onClick={() => router.back()} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            Record Purchase
          </Button>
        </Box>
      </form>
    </LocalizationProvider>
  )
}
