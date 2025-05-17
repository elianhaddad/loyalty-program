import { Typography, Box, Paper, Button } from "@mui/material"
import Link from "next/link"
import ScheduledMessagesList from "./scheduled-messages-list"
import { getScheduledMessages } from "@/lib/actions/scheduled-message-actions"
import { t } from "@/lib/i18n"

export default async function ScheduledMessagesPage() {
  const messages = await getScheduledMessages()

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1">
          {t('scheduledMessages.title')}
        </Typography>
        <Button variant="contained" component={Link} href="/configuration/scheduled-messages/new">
          {t('scheduledMessage.new.title')}
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <ScheduledMessagesList initialMessages={messages} />
      </Paper>
    </Box>
  )
}
