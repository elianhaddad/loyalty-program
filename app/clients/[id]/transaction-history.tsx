"use client"

import type React from "react"

import { useState } from "react"
import { t } from 'lib/i18n';
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
          placeholder={t('transactionHistory.placeholder')}
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
          {t('transactionHistory.noResults')}
        </Typography>
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label={t('transactionHistory.tableAriaLabel')}>
            <TableHead>
              <TableRow>
                <TableCell>{t('transactionHistory.date')}</TableCell>
                <TableCell>{t('transactionHistory.type')}</TableCell>
                <TableCell align="right">{t('transactionHistory.amount')}</TableCell>
                <TableCell align="right">{t('transactionHistory.points')}</TableCell>
                <TableCell>{t('transactionHistory.details')}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction) => (
                <TableRow key={transaction._id}>
                  <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {transaction.type === "purchase" ? (
                      <Chip icon={<ArrowUpward fontSize="small" />} label={t('transactionHistory.purchase')} color="success" size="small" />
                    ) : (
                      <Chip icon={<ArrowDownward fontSize="small" />} label={t('transactionHistory.redemption')} color="error" size="small" />
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
                  <TableCell>{transaction.details || t('transactionHistory.noDetails')}</TableCell>
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
