import { Typography, Box, Paper } from "@mui/material"
import ClientForm from "../client-form"
import { t } from '../../../lib/i18n';

export default function NewClientPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('clients.add')}
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <ClientForm />
      </Paper>
    </Box>
  )
}
