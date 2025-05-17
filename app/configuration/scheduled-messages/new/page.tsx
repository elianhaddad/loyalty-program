import { Typography, Box, Paper } from "@mui/material"
import ScheduledMessageForm from "../scheduled-message-form"
import { t } from "@/lib/i18n"

export default function NewScheduledMessagePage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('scheduledMessage.new.title')}
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <ScheduledMessageForm />
      </Paper>
    </Box>
  )
}
