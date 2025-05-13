import { Typography, Button, Box } from "@mui/material"
import Link from "next/link"
import ClientList from "./client-list"
import { getClients } from "@/lib/actions/client-actions"

export default async function ClientsPage() {
  const clients = await getClients()

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1">
          Clients
        </Typography>
        <Button variant="contained" component={Link} href="/clients/new">
          Add New Client
        </Button>
      </Box>

      <ClientList initialClients={clients} />
    </Box>
  )
}
