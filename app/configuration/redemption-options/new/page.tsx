import { Typography, Box, Paper } from "@mui/material"
import RedemptionOptionForm from "../redemption-option-form"

export default function NewRedemptionOptionPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Add New Redemption Option
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <RedemptionOptionForm />
      </Paper>
    </Box>
  )
}
