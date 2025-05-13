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
  Chip,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material"
import { Search, ArrowUpward, ArrowDownward } from "@mui/icons-material"

interface Transaction {
  _id: string
  type: "purchase" | "redemption"
  amount: number
  points: number
  date: string
  details?: string
}

interface TransactionHistoryProps {
  transactions: Transaction[]
}

export default function TransactionHistory({ transactions }: TransactionHistoryProps) {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions)

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
      setFilteredTransactions(transactions)
    } else {
      const filtered = transactions.filter(
        (transaction) =>
          transaction.details?.toLowerCase().includes(value) ||
          false ||
          transaction.type.toLowerCase().includes(value) ||
          transaction.date.toLowerCase().includes(value),
      )
      setFilteredTransactions(filtered)
    }
  }

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search transactions..."
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

      {filteredTransactions.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: "center", py: 4 }}>
          No transactions found.
        </Typography>
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="transaction history table">
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell align="right">Amount (ARS)</TableCell>
                <TableCell align="right">Points</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {transaction.type === "purchase" ? (
                      <Chip icon={<ArrowUpward fontSize="small" />} label="Purchase" color="success" size="small" />
                    ) : (
                      <Chip icon={<ArrowDownward fontSize="small" />} label="Redemption" color="error" size="small" />
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {transaction.amount.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
                  </TableCell>
                  <TableCell align="right">
                    {transaction.type === "purchase" ? (
                      <Typography color="success.main">+{transaction.points}</Typography>
                    ) : (
                      <Typography color="error.main">-{transaction.points}</Typography>
                    )}
                  </TableCell>
                  <TableCell>{transaction.details || "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredTransactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      )}
    </>
  )
}
