import { Typography, Box, Paper } from "@mui/material"
import LoginForm from "../login-form"
import { t } from "../../../lib/i18n";

export default function LoginPage() {
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
      <Paper sx={{ p: 4, maxWidth: 500, width: "100%" }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {t('auth.login')}
        </Typography>
        <LoginForm />
      </Paper>
    </Box>
  )
}
