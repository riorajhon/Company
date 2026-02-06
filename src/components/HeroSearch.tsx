'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

export default function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    router.push(q.trim() ? `/jobs?q=${encodeURIComponent(q.trim())}` : '/jobs');
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5, alignItems: 'center', mt: 3 }}>
      <TextField
        placeholder="Job title or skills"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search jobs"
        size="medium"
        sx={{
          minWidth: 280,
          flex: 1,
          '& .MuiOutlinedInput-root': {
            bgcolor: 'background.paper',
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'primary.light' },
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" fontSize="small" />
            </InputAdornment>
          ),
        }}
      />
      <Button type="submit" variant="contained" size="large" startIcon={<SearchIcon />}>
        Search jobs
      </Button>
    </Box>
  );
}
