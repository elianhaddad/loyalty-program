import { Typography, Box, Paper, Grid, Button } from "@mui/material"
import Link from "next/link"
import { Settings, Redeem, Message } from "@mui/icons-material"
import ConfigurationForm from "./configuration-form"
import { getConfigurations } from "@/lib/actions/configuration-actions"

export default async function ConfigurationPage() {
  const configurations = await getConfigurations()

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        System Configuration
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Settings sx={{ fontSize: 60, mb: 2, color: "primary.main" }} />
            <Typography variant="h6" gutterBottom>
              Points Configuration
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph align="center">
              Set the conversion rate for each day of the week
            </Typography>
            <Button variant="outlined" component={Link} href="/configuration">
              Manage Points Rates
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Redeem sx={{ fontSize: 60, mb: 2, color: "secondary.main" }} />
            <Typography variant="h6" gutterBottom>
              Redemption Options
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph align="center">
              Manage available redemption options for clients
            </Typography>
            <Button variant="outlined" component={Link} href="/configuration/redemption-options">
              Manage Redemptions
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Message sx={{ fontSize: 60, mb: 2, color: "success.main" }} />
            <Typography variant="h6" gutterBottom>
              WhatsApp Messages
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph align="center">
              Configure scheduled and broadcast messages
            </Typography>
            <Button variant="outlined" component={Link} href="/configuration/scheduled-messages">
              Manage Messages
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h5" component="h2" gutterBottom>
        Points Conversion Rates
      </Typography>

      <Paper sx={{ p: 3 }}>
        <ConfigurationForm initialConfigurations={configurations} />
      </Paper>
    </Box>
  )
}
