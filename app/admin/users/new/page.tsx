import { Typography, Box, Paper } from "@mui/material"
import UserForm from "../user-form"
import { t } from "@/lib/i18n"

export default function NewUserPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
      {t('auth.edit.add')}
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <UserForm />
      </Paper>
    </Box>
  )
}
