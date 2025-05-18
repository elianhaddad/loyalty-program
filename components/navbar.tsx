"use client"

import type React from "react"

import { useState } from "react"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  useMediaQuery,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material"
import {
  Menu as MenuIcon,
  Person,
  ShoppingCart,
  Settings,
  Home,
  Redeem,
  Logout,
  SupervisorAccount,
} from "@mui/icons-material"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { t } from "@/lib/i18n"

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const pathname = usePathname()
  const theme = useTheme()
  const router = useRouter()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))
  const { data: session } = useSession()

  const isAdmin = session?.user?.role === "admin"

  const menuItems = [
    { text: t('navbar.home'), icon: <Home />, path: "/" },
    { text: t('navbar.clients'), icon: <Person />, path: "/clients" },
    { text: t('navbar.purchases'), icon: <ShoppingCart />, path: "/transactions/purchase" },
    { text: t('navbar.redemptions'), icon: <Redeem />, path: "/transactions/redemption" },
    { text: t('navbar.configuration'), icon: <Settings />, path: "/configuration" },
  ]

  // Add admin menu items if user is admin
  if (isAdmin) {
    // menuItems.push({ text: t('navbar.userManagement'), icon: <SupervisorAccount />, path: "/admin/users" })
  }

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return
    }
    setDrawerOpen(open)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = async () => {
    handleMenuClose()
    await signOut({ redirect: false })
    router.push("/auth/login")
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {t('navbar.title')}
          </Typography>

          {!isMobile && (
            <Box>
              {menuItems.map((item) => (
                <Button
                  key={item.text}
                  color="inherit"
                  component={Link}
                  href={item.path}
                  sx={{
                    mx: 1,
                    borderBottom: pathname === item.path ? "2px solid white" : "none",
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}

          {session?.user ? (
            <>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenuOpen}
                color="inherit"
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}>
                  {session.user.name?.charAt(0) || "U"}
                </Avatar>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem disabled>
                  <Typography variant="body2">
                    {t('navbar.signedInAs')} <strong>{session.user.email}</strong>
                  </Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  {t('navbar.logout')}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button color="inherit" component={Link} href="/auth/login">
              {t('navbar.login')}
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            {menuItems.map((item) => (
              <ListItem button key={item.text} component={Link} href={item.path} selected={pathname === item.path}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  )
}
