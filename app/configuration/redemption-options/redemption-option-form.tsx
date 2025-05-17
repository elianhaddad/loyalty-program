"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { TextField, Button, Box, Grid, Alert, CircularProgress, FormControlLabel, Switch } from "@mui/material"
import { createRedemptionOption, updateRedemptionOption } from "@/lib/actions/redemption-options-actions"
import { t } from "@/lib/i18n"

interface RedemptionOptionFormProps {
  option?: {
    _id: string
    points: number
    details: string
    active: boolean
  }
}

export default function RedemptionOptionForm({ option }: RedemptionOptionFormProps = {}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    points: option?.points?.toString() || "",
    details: option?.details || "",
    active: option?.active ?? true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, active: e.target.checked }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const points = Number.parseInt(formData.points)

      if (isNaN(points) || points <= 0) {
        throw new Error("Points must be a positive number")
      }

      if (option?._id) {
        // Update existing option
        await updateRedemptionOption(option._id, {
          points,
          details: formData.details,
          active: formData.active,
        })
      } else {
        // Create new option
        await createRedemptionOption({
          points,
          details: formData.details,
        })
      }

      router.push("/configuration/redemption-options")
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
        <Grid item xs={12} md={6}>
          <TextField
            required
            fullWidth
            label={t('redemptionOption.points')}
            name="points"
            type="number"
            value={formData.points}
            onChange={handleChange}
            disabled={loading}
            inputProps={{ min: 1 }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          {option && (
            <FormControlLabel
              control={
                <Switch
                  checked={formData.active}
                  onChange={handleSwitchChange}
                  name="active"
                  color="primary"
                  disabled={loading}
                />
              }
              label={t('redemptionOption.active')}
            />
          )}
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label={t('redemptionOption.details')}
            name="details"
            value={formData.details}
            onChange={handleChange}
            disabled={loading}
            multiline
            rows={3}
            placeholder={t('redemptionOption.details.placeholder')}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined" onClick={() => router.back()} disabled={loading}>
          {t('common.cancel')}
        </Button>
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          startIcon={loading ? <CircularProgress size={20} /> : null}
        >
          {option?._id ? t('redemptionOption.button.update') : t('redemptionOption.button.create')}
        </Button>
      </Box>
    </form>
  )
}
