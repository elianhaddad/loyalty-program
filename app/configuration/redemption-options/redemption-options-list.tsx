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
  Switch,
  FormControlLabel,
} from "@mui/material"
import { Edit, Search, Delete } from "@mui/icons-material"
import Link from "next/link"
import { deleteRedemptionOption, updateRedemptionOption } from "@/lib/actions/redemption-options-actions"
import { useRouter } from "next/navigation"
import { t } from "@/lib/i18n"

interface RedemptionOption {
  _id: string
  points: number
  details: string
  active: boolean
}

interface RedemptionOptionsListProps {
  initialOptions: RedemptionOption[]
}

export default function RedemptionOptionsList({ initialOptions }: RedemptionOptionsListProps) {
  const router = useRouter()
  const [options, setOptions] = useState<RedemptionOption[]>(initialOptions)
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
      setOptions(initialOptions)
    } else {
      const filtered = initialOptions.filter(
        (option) => option.details.toLowerCase().includes(value) || option.points.toString().includes(value),
      )
      setOptions(filtered)
    }
  }

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    const option = options.find((o) => o._id === id)
    if (!option) return

    try {
      await updateRedemptionOption(id, {
        points: option.points,
        details: option.details,
        active: !currentActive,
      })

      // Update local state
      setOptions((prev) => prev.map((o) => (o._id === id ? { ...o, active: !currentActive } : o)))

      router.refresh()
    } catch (error) {
      console.error("Error toggling active status:", error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm(t('redemptionOptions.delete.confirm'))) return

    try {
      await deleteRedemptionOption(id)

      // Update local state
      setOptions((prev) => prev.filter((o) => o._id !== id))

      router.refresh()
    } catch (error) {
      console.error("Error deleting redemption option:", error)
    }
  }

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={t('redemptionOptions.search')}
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
        <Table sx={{ minWidth: 650 }} aria-label={t('redemptionOptions.table.ariaLabel')}>
          <TableHead>
            <TableRow>
              <TableCell>{t('redemptionOption.points')}</TableCell>
              <TableCell>{t('redemptionOption.details')}</TableCell>
              <TableCell align="center">{t('redemptionOption.active')}</TableCell>
              <TableCell align="center">{t('common.actions')}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {options.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((option) => (
              <TableRow key={option._id}>
                <TableCell>{option.points}</TableCell>
                <TableCell>{option.details}</TableCell>
                <TableCell align="center">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={option.active}
                        onChange={() => handleToggleActive(option._id, option.active)}
                        color="primary"
                      />
                    }
                    label=""
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    component={Link}
                    href={`/configuration/redemption-options/${option._id}/edit`}
                    aria-label={t('common.edit')}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(option._id)} aria-label={t('common.delete')}>
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
          count={options.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  )
}
