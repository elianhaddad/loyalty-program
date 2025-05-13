import { Typography, Box, Paper } from "@mui/material"
import RedemptionOptionForm from "../../redemption-option-form"
import { getRedemptionOptions } from "@/lib/actions/redemption-options-actions"
import { notFound } from "next/navigation"

interface EditRedemptionOptionPageProps {
  params: {
    id: string
  }
}

export default async function EditRedemptionOptionPage({ params }: EditRedemptionOptionPageProps) {
  const options = await getRedemptionOptions()
  const option = options.find((o) => o._id === params.id)

  if (!option) {
    notFound()
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Redemption Option
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <RedemptionOptionForm option={option} />
      </Paper>
    </Box>
  )
}
