import { Box, Typography, Grid, Paper } from "@mui/material"
import { Person, ShoppingCart, Settings, Redeem } from "@mui/icons-material"
import Link from "next/link"
import { t } from "@/lib/i18n"

export default function Home() {
  const menuItems = [
    { title: t('home.menu.clients'), icon: <Person sx={{ fontSize: 60 }} />, link: "/clients" },
    { title: t('home.menu.purchases'), icon: <ShoppingCart sx={{ fontSize: 60 }} />, link: "/transactions/purchase" },
    { title: t('home.menu.redemptions'), icon: <Redeem sx={{ fontSize: 60 }} />, link: "/transactions/redemption" },
    { title: t('home.menu.configuration'), icon: <Settings sx={{ fontSize: 60 }} />, link: "/configuration" },
  ]

  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        {t('home.title')}
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <Grid item xs={12} sm={6} md={3} key={item.title}>
            <Link href={item.link} style={{ textDecoration: "none" }}>
              <Paper
                sx={{
                  p: 3,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  height: 200,
                  justifyContent: "center",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                {item.icon}
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {item.title}
                </Typography>
              </Paper>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
