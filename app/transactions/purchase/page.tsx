import { Typography, Box, Paper } from "@mui/material"
import PurchaseForm from "./purchase-form"

export default function PurchasePage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Record Purchase
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <PurchaseForm />
      </Paper>
    </Box>
  )
}
