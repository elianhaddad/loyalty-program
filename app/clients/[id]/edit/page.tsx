import { Typography, Box, Paper } from "@mui/material"
import ClientForm from "../../client-form"
import { getClientById } from "@/lib/actions/client-actions"
import { notFound } from "next/navigation"

interface EditClientPageProps {
  params: {
    id: string
  }
}

export default async function EditClientPage({ params }: EditClientPageProps) {
  const client = await getClientById(params.id)

  if (!client) {
    notFound()
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit Client
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <ClientForm client={client} />
      </Paper>
    </Box>
  )
}
