import { Typography, Box, Paper } from "@mui/material"
import RedemptionForm from "./redemption-form"
import { t } from "@/lib/i18n"

export default function RedemptionPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t("redemptions.record")}
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <RedemptionForm />
      </Paper>
    </Box>
  )
}
