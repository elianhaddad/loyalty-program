"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  TextField,
  Button,
  Box,
  Grid,
  Alert,
  CircularProgress,
  FormControlLabel,
  Switch,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  Select,
  MenuItem,
  InputLabel,
  Checkbox,
  ListItemText,
  OutlinedInput,
  FormGroup,
} from "@mui/material"
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { createScheduledMessage, updateScheduledMessage } from "@/lib/actions/scheduled-message-actions"
import type { MessageType, RecurrencePattern } from "@/lib/models/scheduled-message"

interface ScheduledMessageFormProps {
  message?: {
    _id: string
    name: string
    message: string
    type: MessageType
    scheduledDate: string | null
    recurrencePattern: RecurrencePattern
    recurrenceDays: string[]
    active: boolean
  }
}

const DAYS_OF_WEEK = [
  { value: "monday", label: "Monday" },
  { value: "tuesday", label: "Tuesday" },
  { value: "wednesday", label: "Wednesday" },
  { value: "thursday", label: "Thursday" },
  { value: "friday", label: "Friday" },
  { value: "saturday", label: "Saturday" },
  { value: "sunday", label: "Sunday" },
]

export default function ScheduledMessageForm({ message }: ScheduledMessageFormProps = {}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: message?.name || "",
    message: message?.message || "",
    type: message?.type || ("one-time" as MessageType),
    scheduledDate: message?.scheduledDate ? new Date(message.scheduledDate) : new Date(),
    recurrencePattern: message?.recurrencePattern || ("daily" as RecurrencePattern),
    recurrenceDays: message?.recurrenceDays || ["monday"],
    active: message?.active ?? true,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, active: e.target.checked }))
  }

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, type: e.target.value as MessageType }))
  }

  const handleRecurrencePatternChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setFormData((prev) => ({ ...prev, recurrencePattern: e.target.value as RecurrencePattern }))
  }

  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      setFormData((prev) => ({ ...prev, scheduledDate: newDate }))
    }
  }

  const handleDaysChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string[]
    setFormData((prev) => ({ ...prev, recurrenceDays: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (formData.message.trim() === "") {
        throw new Error("Message content cannot be empty")
      }

      if (formData.type === "one-time" && formData.scheduledDate < new Date()) {
        throw new Error("Scheduled date must be in the future")
      }

      if (
        formData.type === "recurring" &&
        formData.recurrencePattern === "weekly" &&
        formData.recurrenceDays.length === 0
      ) {
        throw new Error("Please select at least one day of the week")
      }

      if (message?._id) {
        // Update existing message
        await updateScheduledMessage(message._id, {
          name: formData.name,
          message: formData.message,
          type: formData.type,
          scheduledDate: formData.type === "one-time" ? formData.scheduledDate : undefined,
          recurrencePattern: formData.type === "recurring" ? formData.recurrencePattern : undefined,
          recurrenceDays:
            formData.type === "recurring" && formData.recurrencePattern === "weekly"
              ? formData.recurrenceDays
              : undefined,
          active: formData.active,
        })
      } else {
        // Create new message
        await createScheduledMessage({
          name: formData.name,
          message: formData.message,
          type: formData.type,
          scheduledDate: formData.type === "one-time" ? formData.scheduledDate : undefined,
          recurrencePattern: formData.type === "recurring" ? formData.recurrencePattern : undefined,
          recurrenceDays:
            formData.type === "recurring" && formData.recurrencePattern === "weekly"
              ? formData.recurrenceDays
              : undefined,
        })
      }

      router.push("/configuration/scheduled-messages")
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
            <TextField
              required
              fullWidth
              label="Message Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              placeholder="E.g., Weekly Promotion, Special Offer, etc."
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Message Content"
              name="message"
              value={formData.message}
              onChange={handleChange}
              disabled={loading}
              multiline
              rows={4}
              placeholder="Enter the message that will be sent to clients..."
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Message Type</FormLabel>
              <RadioGroup row name="type" value={formData.type} onChange={handleTypeChange}>
                <FormControlLabel value="one-time" control={<Radio />} label="One-time" disabled={loading} />
                <FormControlLabel value="recurring" control={<Radio />} label="Recurring" disabled={loading} />
              </RadioGroup>
            </FormControl>
          </Grid>

          {formData.type === "one-time" && (
            <Grid item xs={12} md={6}>
              <DateTimePicker
                label="Scheduled Date & Time"
                value={formData.scheduledDate}
                onChange={handleDateChange}
                slotProps={{ textField: { fullWidth: true } }}
                disabled={loading}
              />
            </Grid>
          )}

          {formData.type === "recurring" && (
            <>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth disabled={loading}>
                  <InputLabel id="recurrence-pattern-label">Recurrence Pattern</InputLabel>
                  <Select
                    labelId="recurrence-pattern-label"
                    id="recurrence-pattern"
                    value={formData.recurrencePattern}
                    onChange={handleRecurrencePatternChange}
                    label="Recurrence Pattern"
                  >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly (1st day)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              {formData.recurrencePattern === "weekly" && (
                <Grid item xs={12}>
                  <FormControl fullWidth disabled={loading}>
                    <InputLabel id="days-of-week-label">Days of Week</InputLabel>
                    <Select
                      labelId="days-of-week-label"
                      id="days-of-week"
                      multiple
                      value={formData.recurrenceDays}
                      onChange={handleDaysChange}
                      input={<OutlinedInput label="Days of Week" />}
                      renderValue={(selected) =>
                        (selected as string[]).map((day) => day.charAt(0).toUpperCase() + day.slice(1)).join(", ")
                      }
                    >
                      {DAYS_OF_WEEK.map((day) => (
                        <MenuItem key={day.value} value={day.value}>
                          <Checkbox checked={formData.recurrenceDays.indexOf(day.value) > -1} />
                          <ListItemText primary={day.label} />
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
            </>
          )}

          {message && (
            <Grid item xs={12}>
              <FormGroup>
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
                  label="Active"
                />
              </FormGroup>
            </Grid>
          )}
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
            {message?._id ? "Update" : "Create"} Message
          </Button>
        </Box>
      </form>
    </LocalizationProvider>
  )
}
