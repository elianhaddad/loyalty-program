import { Typography, Box, Paper } from "@mui/material"
import ScheduledMessageForm from "../scheduled-message-form"

export default function NewScheduledMessagePage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Create New Scheduled Message
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <ScheduledMessageForm />
      </Paper>
    </Box>
  )
}
