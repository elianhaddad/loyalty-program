import { Typography, Box, Paper, Button } from "@mui/material"
import Link from "next/link"
import UserList from "./user-list"
import { getUsers } from "@/lib/actions/auth-actions"
import { t } from "@/lib/i18n"

export default async function UsersPage() {
  const users = await getUsers()

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" component="h1">
        {t('auth.edit.manage')}
        </Typography>
        <Button variant="contained" component={Link} href="/admin/users/new">
          {t('auth.edit.add')}
        </Button>
      </Box>

      <Paper sx={{ p: 3 }}>
        <UserList initialUsers={users} />
      </Paper>
    </Box>
  )
}
