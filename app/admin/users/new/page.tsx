import { Typography, Box, Paper } from "@mui/material"
import UserForm from "../user-form"

export default function NewUserPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New User
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <UserForm />
      </Paper>
    </Box>
  )
}
