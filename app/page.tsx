import { Box, Typography, Grid, Paper } from "@mui/material"
import { Person, ShoppingCart, Settings, Redeem } from "@mui/icons-material"
import Link from "next/link"

export default function Home() {
  const menuItems = [
    { title: "Clients", icon: <Person sx={{ fontSize: 60 }} />, link: "/clients" },
    { title: "Purchases", icon: <ShoppingCart sx={{ fontSize: 60 }} />, link: "/transactions/purchase" },
    { title: "Redemptions", icon: <Redeem sx={{ fontSize: 60 }} />, link: "/transactions/redemption" },
    { title: "Configuration", icon: <Settings sx={{ fontSize: 60 }} />, link: "/configuration" },
  ]

  return (
    <Box sx={{ flexGrow: 1, mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Points Management System
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
