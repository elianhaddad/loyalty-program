import { Typography, Box, Paper, Button } from "@mui/material"
import Link from "next/link"
import { getClientById } from "@/lib/actions/client-actions"
import { getClientTransactions } from "@/lib/actions/transaction-actions"
import ClientDetails from "./client-details"
import TransactionHistory from "./transaction-history"
import { notFound } from "next/navigation"

interface ClientPageProps {
  params: {
    id: string
  }
}

export default async function ClientPage({ params }: ClientPageProps) {
  const client = await getClientById(params.id)

  if (!client) {
    notFound()
  }

  const transactions = await getClientTransactions(params.id)

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1">
          Client Details
        </Typography>
        <Box>
          <Button variant="outlined" component={Link} href={`/clients/${params.id}/edit`} sx={{ mr: 2 }}>
            Edit Client
          </Button>
          <Button variant="contained" component={Link} href="/clients">
            Back to Clients
          </Button>
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 4 }}>
        <ClientDetails client={client} />
      </Paper>

      <Typography variant="h5" component="h2" gutterBottom>
        Transaction History
      </Typography>

      <Paper sx={{ p: 3 }}>
        <TransactionHistory transactions={transactions} />
      </Paper>
    </Box>
  )
}
