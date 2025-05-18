"use client"

import type React from "react"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  TextField,
  InputAdornment,
  Box,
  Chip,
} from "@mui/material"
import { Edit, Search, Delete } from "@mui/icons-material"
import Link from "next/link"
import { t } from "@/lib/i18n"

interface User {
  _id: string
  name: string
  email: string
  role: "admin" | "user"
  createdAt: string
}

interface UserListProps {
  initialUsers: User[]
}

export default function UserList({ initialUsers }: UserListProps) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase()
    setSearchTerm(value)

    if (value === "") {
      setUsers(initialUsers)
    } else {
      const filtered = initialUsers.filter(
        (user) => user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value),
      )
      setUsers(filtered)
    }
  }

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={t("userList.searchPlaceholder")}
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>{t("userList.name")}</TableCell>
              <TableCell>{t("userList.email")}</TableCell>
              <TableCell>{t("userList.role")}</TableCell>
              <TableCell>{t("userList.createdAt")}</TableCell>
              <TableCell align="center">{t("userList.actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Chip
                    label={t(`userForm.role.${user.role}`)}
                    color={user.role === "admin" ? "primary" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell align="center">
                  <IconButton component={Link} href={`/admin/users/${user._id}/edit`} aria-label={t("userList.editAction")}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" aria-label={t("userList.deleteAction")}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  )
}
