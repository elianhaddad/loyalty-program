import { Typography, Box, Paper, Button } from "@mui/material"
import Link from "next/link"
import RedemptionOptionsList from "./redemption-options-list"
import { getRedemptionOptions } from "@/lib/actions/redemption-options-actions"
import { t } from "@/lib/i18n"

export default async function RedemptionOptionsPage() {
  const options = await getRedemptionOptions()

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1">
          {t('redemptionOptions.title')}
        </Typography>
        <Button variant="contained" component={Link} href="/configuration/redemption-options/new">
          {t('redemptionOption.new')}
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <RedemptionOptionsList initialOptions={options} />
      </Paper>
    </Box>
  )
}
