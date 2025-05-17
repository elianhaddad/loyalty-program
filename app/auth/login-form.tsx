"use client"

import type React from "react"

import { useState } from "react"
import { TextField, Button, Alert, CircularProgress } from "@mui/material"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { t } from '../../lib/i18n';

export default function LoginForm() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      })

      if (result?.error) {
        setError(t('auth.error.credentialsSignin'));
        return
      }

      router.push("/")
      router.refresh()
    } catch (err) {
      setError(t('auth.error.unexpected'));
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

      <TextField
        required
        fullWidth
        label={t('auth.email')}
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        disabled={loading}
        margin="normal"
      />

      <TextField
        required
        fullWidth
        label={t('auth.password')}
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        disabled={loading}
        margin="normal"
      />

      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        startIcon={loading ? <CircularProgress size={20} /> : null}
        sx={{ mt: 3, mb: 2 }}
      >
        {t('auth.login')}
      </Button>
    </form>
  )
}
