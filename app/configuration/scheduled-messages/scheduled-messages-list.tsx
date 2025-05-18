"use client";

import type React from "react";

import { useState } from "react";
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
  Chip,
  Tooltip,
} from "@mui/material";
import { Edit, Search, Delete, Schedule, Repeat } from "@mui/icons-material";
import Link from "next/link";
import {
  deleteScheduledMessage,
  toggleScheduledMessageActive,
} from "@/lib/actions/scheduled-message-actions";
import { useRouter } from "next/navigation";
import { t } from "@/lib/i18n";

interface ScheduledMessage {
  _id: string;
  name: string;
  message: string;
  type: "one-time" | "recurring";
  scheduledDate: string | null;
  recurrencePattern: "daily" | "weekly" | "monthly" | null;
  recurrenceDays: string[];
  active: boolean;
  lastRun: string | null;
}

interface ScheduledMessagesListProps {
  initialMessages: ScheduledMessage[];
}

export default function ScheduledMessagesList({
  initialMessages,
}: ScheduledMessagesListProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<ScheduledMessage[]>(initialMessages);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(Number.parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === "") {
      setMessages(initialMessages);
    } else {
      const filtered = initialMessages.filter(
        (message) =>
          message.name.toLowerCase().includes(value) ||
          message.message.toLowerCase().includes(value)
      );
      setMessages(filtered);
    }
  };

  const handleToggleActive = async (id: string, currentActive: boolean) => {
    try {
      await toggleScheduledMessageActive(id, !currentActive);

      // Update local state
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, active: !currentActive } : m))
      );

      router.refresh();
    } catch (error) {
      console.error("Error toggling active status:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(t("scheduledMessages.list.deleteConfirm"))) return;

    try {
      await deleteScheduledMessage(id);

      // Update local state
      setMessages((prev) => prev.filter((m) => m._id !== id));

      router.refresh();
    } catch (error) {
      console.error("Error deleting scheduled message:", error);
    }
  };

  const formatScheduleInfo = (message: ScheduledMessage) => {
    if (message.type === "one-time" && message.scheduledDate) {
      return new Date(message.scheduledDate).toLocaleString();
    } else if (message.type === "recurring" && message.recurrencePattern) {
      if (message.recurrencePattern === "daily") {
        return t("scheduledMessages.list.daily");
      } else if (
        message.recurrencePattern === "weekly" &&
        message.recurrenceDays.length > 0
      ) {
        const daysString = message.recurrenceDays
          .map((d) => t(`scheduledMessages.days.${d}`))
          .join(", ");
        return `${t("scheduledMessages.list.weekly")} ${daysString}`;
      } else if (message.recurrencePattern === "monthly") {
        return t("scheduledMessages.list.monthlyLabel");
      }
    }
    return t("scheduledMessages.list.notScheduled");
  };

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={t("scheduledMessages.list.searchPlaceholder")}
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
        <Table
          sx={{ minWidth: 650 }}
          aria-label={t("scheduledMessages.list.tableAriaLabel")}
        >
          <TableHead>
            <TableRow>
              <TableCell>{t("scheduledMessages.list.column.name")}</TableCell>
              <TableCell>{t("scheduledMessages.list.column.type")}</TableCell>
              <TableCell>
                {t("scheduledMessages.list.column.schedule")}
              </TableCell>
              <TableCell>
                {t("scheduledMessages.list.column.lastRun")}
              </TableCell>
              <TableCell align="center">
                {t("scheduledMessages.list.column.active")}
              </TableCell>
              <TableCell align="center">
                {t("scheduledMessages.list.column.actions")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {messages
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((message) => (
                <TableRow key={message._id}>
                  <TableCell>{message.name}</TableCell>
                  <TableCell>
                    <Chip
                      icon={
                        message.type === "one-time" ? (
                          <Schedule fontSize="small" />
                        ) : (
                          <Repeat fontSize="small" />
                        )
                      }
                      label={
                        message.type === "one-time"
                          ? t("scheduledMessages.list.oneTime")
                          : t("scheduledMessages.list.recurring")
                      }
                      color={
                        message.type === "one-time" ? "primary" : "secondary"
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{formatScheduleInfo(message)}</TableCell>
                  <TableCell>
                    {message.lastRun
                      ? new Date(message.lastRun).toLocaleString()
                      : t("scheduledMessages.list.never")}
                  </TableCell>
                  <TableCell align="center">
                    <FormControlLabel
                      control={
                        <Switch
                          checked={message.active}
                          onChange={() =>
                            handleToggleActive(message._id, message.active)
                          }
                          color="primary"
                        />
                      }
                      label=""
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title={t("scheduledMessages.list.viewEdit")}>
                      <IconButton
                        component={Link}
                        href={`/configuration/scheduled-messages/${message._id}`}
                        aria-label={t("scheduledMessages.list.viewEdit")}
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title={t("scheduledMessages.list.delete")}>
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(message._id)}
                        aria-label={t("scheduledMessages.list.delete")}
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={messages.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </>
  );
}
