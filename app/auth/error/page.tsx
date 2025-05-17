import { Typography, Box, Paper, Button } from "@mui/material"
import Link from "next/link"
import { ErrorOutline } from "@mui/icons-material"
import { t } from '../../../lib/i18n';

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const error = searchParams.error || "An unknown error occurred"

  let errorMessage = t('auth.error.generic');

  switch (error) {
    case "CredentialsSignin":
      errorMessage = t('auth.error.credentialsSignin');
      break
    case "AccessDenied":
      errorMessage = t('auth.error.accessDenied');
      break
    case "Default":
    default:
      errorMessage = t('auth.error.unexpected');
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
          {t('auth.error.title')}
        </Typography>
        <Typography variant="body1" paragraph>
          {errorMessage}
        </Typography>
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button variant="contained" component={Link} href="/auth/login">
            {t('common.back')}
          </Button>
        </Box>
      </Paper>
    </Box>
  )
}
