import { Typography, Box, Paper } from "@mui/material"
import RedemptionOptionForm from "../redemption-option-form"
import { t } from "@/lib/i18n"

export default function NewRedemptionOptionPage() {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('redemptionOption.new')}
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <RedemptionOptionForm />
      </Paper>
    </Box>
  )
}
