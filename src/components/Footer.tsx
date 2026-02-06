'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Logo from './Logo';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

export default function Footer() {
  const year = new Date().getFullYear();

  const careersLinks = [
    { href: '/jobs', label: 'Open jobs' },
    { href: '/why-sobapp', label: 'Why join us' },
    { href: '/about', label: 'About us' },
    { href: '/contact', label: 'Contact' },
  ];

  const companyLinks = [
    { href: '/about', label: 'About us' },
    { href: '/contact', label: 'Contact' },
    { href: '/signin', label: 'Team sign in' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        py: 5,
        px: { xs: 2, sm: 3 },
        bgcolor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={4} sx={{ pb: 3, mb: 2 }}>
          <Box sx={{ maxWidth: 320 }}>
            <Logo />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.6 }}>
              Sobapps delivers blockchain, full‑stack, and crypto solutions. Careers at Sobapps—join our team.
            </Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 6 }}>
            <Box>
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
                Careers
              </Typography>
              <Stack spacing={0.75}>
                {careersLinks.map(({ href, label }) => (
                  <Typography key={href} component={Link} href={href} variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                    {label}
                  </Typography>
                ))}
              </Stack>
            </Box>
            <Box>
              <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5 }}>
                Company
              </Typography>
              <Stack spacing={0.75}>
                {companyLinks.map(({ href, label }) => (
                  <Typography key={href} component={Link} href={href} variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
                    {label}
                  </Typography>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Stack>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body2" color="text.secondary">
          © {year} Sobapps. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
