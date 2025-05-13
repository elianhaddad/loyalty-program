import { Typography, Box, Paper, Button } from "@mui/material"
import Link from "next/link"
import { ErrorOutline } from "@mui/icons-material"

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const error = searchParams.error || "An unknown error occurred"

  let errorMessage = "An error occurred during authentication."

  switch (error) {
    case "CredentialsSignin":
      errorMessage = "Invalid email or password. Please try again."
      break
    case "AccessDenied":
      errorMessage = "You do not have permission to access this resource."
      break
    case "Default":
    default:
      errorMessage = "An unexpected error occurred. Please try again later."
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
      }}
    >
      <Paper sx={{ p: 4, maxWidth: 500, width: "100%", textAlign: "center" }}>
        <ErrorOutline color="error" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h4" component="h1" gutterBottom>
          Authentication Error
        </Typography>
        <Typography variant="body1" paragraph>
          {errorMessage}
        </Typography>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" component={Link} href="/auth/login">
            Back to Login
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
