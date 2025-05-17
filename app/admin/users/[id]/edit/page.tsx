import { Typography, Box, Paper } from "@mui/material"
import UserForm from "../../user-form"
import { getUserById } from "@/lib/actions/auth-actions"
import { notFound } from "next/navigation"
import { t } from "@/lib/i18n"

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
       {t('auth.edit.user')}
      </Typography>

      <Paper sx={{ p: 3, mt: 2 }}>
        <UserForm user={user} />
      </Paper>
    </Box>
  )
}
