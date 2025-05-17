import { Typography, Box, Paper, Grid, Button } from "@mui/material"
import Link from "next/link"
import { Settings, Redeem, Message } from "@mui/icons-material"
import ConfigurationForm from "./configuration-form"
import { getConfigurations } from "@/lib/actions/configuration-actions"
import { t } from "@/lib/i18n"

export default async function ConfigurationPage() {
  const configurations = await getConfigurations()

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('configurationPage.title')}
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
              {t('configurationPage.card.points.title')}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph align="center">
              {t('configurationPage.card.points.description')}
            </Typography>
            <Button variant="outlined" component={Link} href="/configuration">
              {t('configurationPage.card.points.button')}
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
              {t('configurationPage.card.redemptions.title')}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph align="center">
              {t('configurationPage.card.redemptions.description')}
            </Typography>
            <Button variant="outlined" component={Link} href="/configuration/redemption-options">
              {t('configurationPage.card.redemptions.button')}
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
              {t('configurationPage.card.messages.title')}
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph align="center">
              {t('configurationPage.card.messages.description')}
            </Typography>
            <Button variant="outlined" component={Link} href="/configuration/scheduled-messages">
              {t('configurationPage.card.messages.button')}
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <Typography variant="h5" component="h2" gutterBottom>
        {t('configurationPage.heading.form')}
      </Typography>

      <Paper sx={{ p: 3 }}>
        <ConfigurationForm initialConfigurations={configurations} />
      </Paper>
    </Box>
  )
}
