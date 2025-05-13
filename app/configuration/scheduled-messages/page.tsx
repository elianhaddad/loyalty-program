import { Typography, Box, Paper, Button } from "@mui/material"
import Link from "next/link"
import ScheduledMessagesList from "./scheduled-messages-list"
import { getScheduledMessages } from "@/lib/actions/scheduled-message-actions"

export default async function ScheduledMessagesPage() {
  const messages = await getScheduledMessages()

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1">
          WhatsApp Scheduled Messages
        </Typography>
        <Button variant="contained" component={Link} href="/configuration/scheduled-messages/new">
          Create New Message
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <ScheduledMessagesList initialMessages={messages} />
      </Paper>
    </Box>
  )
}
