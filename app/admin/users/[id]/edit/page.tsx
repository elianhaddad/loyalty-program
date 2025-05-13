import { Typography, Box, Paper } from "@mui/material"
import UserForm from "../../user-form"
import { getUserById } from "@/lib/actions/auth-actions"
import { notFound } from "next/navigation"

interface EditUserPageProps {
  params: {
    id: string
  }
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const user = await getUserById(params.id)

  if (!user) {
    notFound()
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Editar Usuario
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <UserForm user={user} />
      </Paper>
    </Box>
  )
}
