import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import type {Theme, CSSObject } from '@mui/material/styles';
import {
  Box,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Breadcrumbs,
  Link,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useLocation, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CategoryIcon from '@mui/icons-material/Category';
import WalletIcon from '@mui/icons-material/Wallet';
import SummarizeIcon from '@mui/icons-material/Summarize';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import SettingsIcon from '@mui/icons-material/Settings';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const navItems = [
  { label: 'Home', path: '/home', icon: <HomeIcon /> },
  { label: 'Transactions', path: '/transactions', icon: <ReceiptIcon /> },
  { label: 'Categories', path: '/categories', icon: <CategoryIcon /> },
  { label: 'Budgets', path: '/budgets', icon: <WalletIcon /> },
  { label: 'Reports', path: '/reports', icon: <SummarizeIcon /> },
  { label: 'Accounts', path: '/accounts', icon: <ManageAccountsIcon /> },
  { label: 'Subscriptions', path: '/subscriptions', icon: <SubscriptionsIcon /> },
  { label: 'Settings', path: '/settings', icon: <SettingsIcon /> },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleDrawerToggle = () => setOpen((prev) => !prev);

  // Breadcrumbs based on current path
  const pathSegments = location.pathname.split('/').filter(Boolean);
//   const breadcrumbs = pathSegments.map((segment, idx) => {
//     const path = `/${pathSegments.slice(0, idx + 1).join('/')}`;
//     const isLast = idx === pathSegments.length - 1;
//     return isLast ? (
//       <Typography key={path} color="text.primary">
//         {segment.charAt(0).toUpperCase() + segment.slice(1)}
//       </Typography>
//     ) : (
//       <Link key={path} color="inherit" underline="hover" onClick={() => navigate(path)} sx={{ cursor: 'pointer' }}>
//         {segment.charAt(0).toUpperCase() + segment.slice(1)}
//       </Link>
//     );
//   });

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Fixed Header */}
      <AppBar position="fixed" color="primary" elevation={3}>
        <Toolbar sx={{ position: 'relative' }}>
          <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          {/* Centered Title */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              fontWeight: 600,
            }}
          >
            Expense Management Application
          </Typography>

          {/* Right Account Icon */}
          <Box sx={{ marginLeft: 'auto' }}>
            <IconButton color="inherit">
              <AccountCircle fontSize="large" />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Side Drawer */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerToggle}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                selected={location.pathname === item.path}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>

      {/* Page Content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
    {/* Always show Home */}
    <Link
      color="inherit"
      underline="hover"
      onClick={() => navigate('/home')}
      sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
    >
      Home
    </Link>

    {/* Dynamic segments */}
    {pathSegments.map((segment, idx) => {
      const path = `/${pathSegments.slice(0, idx + 1).join('/')}`;
      const isLast = idx === pathSegments.length - 1;
      return isLast ? (
        <Typography key={path} color="text.primary">
          {segment.charAt(0).toUpperCase() + segment.slice(1)}
        </Typography>
      ) : (
        <Link
          key={path}
          color="inherit"
          underline="hover"
          onClick={() => navigate(path)}
          sx={{ cursor: 'pointer' }}
        >
          {segment.charAt(0).toUpperCase() + segment.slice(1)}
        </Link>
      );
    })}
  </Breadcrumbs>
        {children}
      </Box>
    </Box>
  );
}
