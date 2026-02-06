'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ThemeToggle from './ThemeToggle';
import Logo from './Logo';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/why-sobapp', label: 'Why join us' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'background.paper',
          color: 'text.primary',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ maxWidth: 1200, mx: 'auto', width: '100%', px: { xs: 2, sm: 3 }, minHeight: 56 }}>
          <IconButton
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            sx={{ display: { md: 'none' }, mr: 1 }}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>

          <Logo />

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1, ml: 3, flex: 1 }}>
            {nav.map(({ href, label }) => (
              <Button
                key={href}
                component={Link}
                href={href}
                size="small"
                color={pathname === href ? 'primary' : 'inherit'}
                sx={{
                  fontWeight: pathname === href ? 600 : 500,
                  color: pathname === href ? 'primary.main' : 'text.secondary',
                  '&:hover': { color: 'text.primary', bgcolor: 'action.hover' },
                }}
              >
                {label}
              </Button>
            ))}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {status === 'authenticated' && (
              <>
                <IconButton component={Link} href="/dashboard" aria-label="Dashboard" sx={{ display: { xs: 'none', lg: 'inline-flex' } }} color="inherit">
                  <DashboardIcon />
                </IconButton>
                <IconButton
                  component={Link}
                  href="/dashboard/jobs/new"
                  aria-label="Post a job"
                  sx={{ bgcolor: 'primary.main', color: 'primary.contrastText', '&:hover': { bgcolor: 'primary.dark' } }}
                >
                  <AddCircleIcon />
                </IconButton>
                <IconButton onClick={() => signOut({ callbackUrl: '/' })} aria-label="Sign out" sx={{ display: { xs: 'none', lg: 'inline-flex' } }} color="inherit">
                  <LogoutIcon />
                </IconButton>
              </>
            )}
            <ThemeToggle />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: { width: 280, bgcolor: 'background.paper', borderRight: 1, borderColor: 'divider' },
        }}
      >
        <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Logo />
          <IconButton onClick={() => setMobileOpen(false)} aria-label="Close menu" size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Box component="nav" sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          {nav.map(({ href, label }) => (
            <Button
              key={href}
              component={Link}
              href={href}
              onClick={() => setMobileOpen(false)}
              fullWidth
              sx={{
                justifyContent: 'flex-start',
                px: 2,
                py: 1.5,
                bgcolor: pathname === href ? 'action.selected' : 'transparent',
                color: pathname === href ? 'primary.main' : 'text.primary',
                fontWeight: pathname === href ? 600 : 500,
              }}
            >
              {label}
            </Button>
          ))}
          {status === 'authenticated' && (
            <>
              <Button component={Link} href="/dashboard" onClick={() => setMobileOpen(false)} fullWidth startIcon={<DashboardIcon />} sx={{ justifyContent: 'flex-start', px: 2, py: 1.5 }}>
                Dashboard
              </Button>
              <Button component={Link} href="/dashboard/jobs/new" onClick={() => setMobileOpen(false)} fullWidth startIcon={<AddCircleIcon />} sx={{ justifyContent: 'flex-start', px: 2, py: 1.5 }}>
                Post a job
              </Button>
              <Button onClick={() => { signOut({ callbackUrl: '/' }); setMobileOpen(false); }} fullWidth startIcon={<LogoutIcon />} sx={{ justifyContent: 'flex-start', px: 2, py: 1.5 }}>
                Sign out
              </Button>
            </>
          )}
        </Box>
      </Drawer>
    </>
  );
}
