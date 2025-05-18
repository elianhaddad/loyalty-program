import { Typography, Box, Paper } from "@mui/material"
import ScheduledMessageForm from "../scheduled-message-form"
import { getScheduledMessageById } from "@/lib/actions/scheduled-message-actions"
import { notFound } from "next/navigation"
import { t } from "@/lib/i18n"

export default async function ScheduledMessagePage(props: PromiseLike<{ params: { id: any } }> | { params: { id: any } }) {
  const { params: { id } } = await props;
  const message = await getScheduledMessageById(id);
  
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
