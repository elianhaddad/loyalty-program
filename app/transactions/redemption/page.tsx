import { Typography, Box, Paper } from "@mui/material"
import RedemptionForm from "./redemption-form"

export default function RedemptionPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Record Points Redemption
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <RedemptionForm />
      </Paper>
    </Box>
  )
}
