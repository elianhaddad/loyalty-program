"use client"

import type React from "react"

import { useState } from "react"
import {
  Paper,
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
} from "@mui/material"
import { Edit, Search, Visibility } from "@mui/icons-material"
import Link from "next/link"

interface Client {
  _id: string
  dni: string
  phone: string
  fullName: string
  totalPoints: number
}

interface ClientListProps {
  initialClients: Client[]
}

export default function ClientList({ initialClients }: ClientListProps) {
  const [clients, setClients] = useState<Client[]>(initialClients)
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
      setClients(initialClients)
    } else {
      const filtered = initialClients.filter(
        (client) =>
          client.fullName.toLowerCase().includes(value) ||
          client.dni.toLowerCase().includes(value) ||
          client.phone.toLowerCase().includes(value),
      )
      setClients(filtered)
    }
  }

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search by name, DNI or phone..."
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

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="clients table">
          <TableHead>
            <TableRow>
              <TableCell>DNI</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell align="right">Total Points</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((client) => (
              <TableRow key={client._id}>
                <TableCell>{client.dni}</TableCell>
                <TableCell>{client.fullName}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell align="right">{client.totalPoints}</TableCell>
                <TableCell align="center">
                  <IconButton component={Link} href={`/clients/${client._id}`} aria-label="view client">
                    <Visibility />
                  </IconButton>
                  <IconButton component={Link} href={`/clients/${client._id}/edit`} aria-label="edit client">
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={clients.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  )
}
