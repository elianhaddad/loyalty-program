import { Typography, Box, Paper } from "@mui/material"
import PurchaseForm from "./purchase-form"
import { t } from "@/lib/i18n"

export default function PurchasePage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('purchasePage.title')}
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <PurchaseForm />
      </Paper>
    </Box>
  )
}
