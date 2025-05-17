"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TextField, Button, Box, Grid, Alert, CircularProgress, FormControlLabel, Switch } from "@mui/material"
import { createClient, updateClient } from "@/lib/actions/client-actions"
import { t } from "@/lib/i18n";

interface ClientFormProps {
  client?: {
    _id: string
    dni: string
    phone: string
    fullName: string
    whatsappSubscribed?: boolean
  }
}

export default function ClientForm({ client }: ClientFormProps = {}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    dni: client?.dni || "",
    phone: client?.phone || "",
    fullName: client?.fullName || "",
    whatsappSubscribed: client?.whatsappSubscribed ?? true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, whatsappSubscribed: e.target.checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (client?._id) {
        // Update existing client
        await updateClient(client._id, formData)
      } else {
        // Create new client
        await createClient(formData)
      }

      router.push("/clients")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label={t("clients.dni")}
            name="dni"
            value={formData.dni}
            onChange={handleChange}
            disabled={loading}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label={t("clients.name")}
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            disabled={loading}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label={t("clients.phone")}
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={loading}
            helperText={t("clients.phone.helper")}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={formData.whatsappSubscribed}
                onChange={handleSwitchChange}
                name="whatsappSubscribed"
                color="primary"
              />
            }
            label={t("clients.whatsappSubscribed")}
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
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {client?._id ? t("clients.edit") : t("clients.add")}
        </Button>
      </Box>
    </form>
  )
}
