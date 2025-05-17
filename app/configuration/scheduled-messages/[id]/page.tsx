import { Typography, Box, Paper } from "@mui/material"
import ScheduledMessageForm from "../scheduled-message-form"
import { getScheduledMessageById } from "@/lib/actions/scheduled-message-actions"
import { notFound } from "next/navigation"
import { t } from "@/lib/i18n"

interface ScheduledMessagePageProps {
  params: {
    id: string
  }
}

export default async function ScheduledMessagePage({ params }: ScheduledMessagePageProps) {
  const message = await getScheduledMessageById(params.id)

  if (!message) {
    notFound()
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('scheduledMessage.edit.title')}
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <ScheduledMessageForm message={message} />
      </Paper>
    </Box>
  )
}
