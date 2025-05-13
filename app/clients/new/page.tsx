import { Typography, Box, Paper } from "@mui/material"
import ClientForm from "../client-form"

export default function NewClientPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Client
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <ClientForm />
      </Paper>
    </Box>
  )
}
