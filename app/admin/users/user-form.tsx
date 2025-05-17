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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material"
import { createUser, updateUser } from "@/lib/actions/auth-actions"
import { t } from "@/lib/i18n"

interface UserFormProps {
  user?: {
    _id: string
    name: string
    email: string
    role: "admin" | "user"
  }
}

export default function UserForm({ user }: UserFormProps = {}) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
    role: user?.role || "user",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleChange = (e: SelectChangeEvent) => {
    setFormData((prev) => ({ ...prev, role: e.target.value as "admin" | "user" }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validate passwords match if creating a new user
    if (!user && formData.password !== formData.confirmPassword) {
      setError(t('auth.password.notmatch'))
      setLoading(false)
      return
    }

    try {
      if (user?._id) {
        // Update existing user
        await updateUser(user._id, {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          ...(formData.password ? { password: formData.password } : {}),
        })
      } else {
        // Create new user
        await createUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        })
      }

      router.push("/admin/users")
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : t('userForm.error.generic'))
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
            label={t('userForm.name')}
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label={t('auth.email')}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label={user ? t('userForm.newPassword') : t('auth.password')}
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            required={!user}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label={t('userForm.confirmPassword')}
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            disabled={loading}
            required={!user}
            error={formData.password !== formData.confirmPassword && formData.confirmPassword !== ""}
            helperText={
              formData.password !== formData.confirmPassword && formData.confirmPassword !== ""
                ? t('auth.password.notmatch')
                : ""
            }
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel id="role-select-label">{t('userForm.role')}</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              value={formData.role}
              label={t('userForm.role')}
              onChange={handleRoleChange}
              disabled={loading}
            >
              <MenuItem value="user">{t('userForm.role.user')}</MenuItem>
              <MenuItem value="admin">{t('userForm.role.admin')}</MenuItem>
            </Select>
          </FormControl>
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
          {user?._id ? t('userForm.button.update') : t('userForm.button.create')}
        </Button>
      </Box>
    </form>
  )
}
