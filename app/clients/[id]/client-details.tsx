"use client"

import { Typography, Grid, Box, Card, CardContent, Chip } from "@mui/material"
import { Person, Phone, Badge, Star } from "@mui/icons-material"
import { t } from '../../../lib/i18n';

interface ClientDetailsProps {
  client: {
    _id: string
    dni: string
    phone: string
    fullName: string
    totalPoints: number
    createdAt: string
  }
}

export default function ClientDetails({ client }: ClientDetailsProps) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Person color="primary" />
            <Typography variant="body1">
              <strong>{t('clients.name')}:</strong> {client.fullName}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Badge color="primary" />
            <Typography variant="body1">
              <strong>{t('clients.dni')}:</strong> {client.dni}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Phone color="primary" />
            <Typography variant="body1">
              <strong>{t('clients.phone')}:</strong> {client.phone}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {t('clients.since')}: {new Date(client.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid item xs={12} md={6}>
        <Card sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CardContent sx={{ textAlign: "center" }}>
            <Star sx={{ fontSize: 60, color: "gold", mb: 2 }} />
            <Typography variant="h4" gutterBottom>
              {client.totalPoints}
            </Typography>
            <Chip label={t('clients.points')} color="primary" />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
