import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import type { Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import type { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MailIcon from "@mui/icons-material/Mail";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { Outlet, Link as RouterLink, useLocation } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import MLink from "@mui/material/Link";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

/**
 * AppBar remains fixed and full-width; it does NOT move when drawer opens.
 * zIndex is high so it sits above Drawer.
 */
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

/**
 * Drawer styled with shouldForwardProp to avoid passing `open` to DOM elements
 * Add explicit generic for open prop typing.
 */
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open?: boolean }>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open
    ? {
        ...openedMixin(theme as Theme),
        "& .MuiDrawer-paper": openedMixin(theme as Theme),
      }
    : {
        ...closedMixin(theme as Theme),
        "& .MuiDrawer-paper": closedMixin(theme as Theme),
      }),
}));

const navItems = [
  { label: "Home", path: "/", icon: <HomeIcon /> },
  { label: "Mail", path: "/mail", icon: <MailIcon /> },
  { label: "Documents", path: "/documents", icon: <DescriptionIcon /> },
  { label: "Info", path: "/info", icon: <InfoIcon /> },
];

export default function DashboardLayout(): React.JSX.Element {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  const toggleDrawer = () => setOpen((prev) => !prev);

  // Create breadcrumbs from current path
  const pathnames = location.pathname.split("/").filter(Boolean);

  const formatBreadcrumb = (s: string) =>
    s.charAt(0).toUpperCase() + s.slice(1);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Fixed AppBar */}
      <AppBar position="fixed" open={open} color="primary" elevation={3}>
        <Toolbar sx={{ position: "relative" }}>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ mr: 2 }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>

          {/* Centered title */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              fontWeight: 600,
              letterSpacing: ".04rem",
            }}
          >
            Performance Metrics
          </Typography>

          {/* Profile icon on right */}
          <Box sx={{ ml: "auto" }}>
            <IconButton color="inherit" aria-label="account">
              <AccountCircle fontSize="large" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer (mini-variant) */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader />
        <Divider />
        <List>
          {navItems.map(({ label, path, icon }) => {
            const active = location.pathname === path;
            return (
              <ListItem key={label} disablePadding sx={{ display: "block" }}>
                <ListItemButton
                  component={RouterLink}
                  to={path}
                  onClick={() => {
                    /* close on mobile? keep open behavior controlled by toggleDrawer if you want */
                  }}
                  sx={{
                    minHeight: 48,
                    px: 2.5,
                    justifyContent: open ? "initial" : "center",
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                      color: active ? "primary.main" : "inherit",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={label}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: active ? "primary.main" : "inherit",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider />
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* spacer for fixed AppBar */}
        <Toolbar />

        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <MLink
            component={RouterLink}
            to="/"
            underline="hover"
            color="inherit"
            sx={{ cursor: "pointer" }}
          >
            Home
          </MLink>

        {pathnames.map((name, idx) => {
          const to = `/${pathnames.slice(0, idx + 1).join("/")}`;
          const isLast = idx === pathnames.length - 1;
          return isLast ? (
            <Typography color="text.primary" key={to}>
              {formatBreadcrumb(name)}
            </Typography>
          ) : (
            <MLink
              component={RouterLink}
              underline="hover"
              color="inherit"
              to={to}
              key={to}
            >
              {formatBreadcrumb(name)}
            </MLink>
          );
        })}
        </Breadcrumbs>

        {/* Routed pages render here */}
        <Outlet />
      </Box>
    </Box>
  );
}
