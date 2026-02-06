'use client';

import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListIcon from '@mui/icons-material/List';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

interface JobCardProps {
  id: string;
  title: string;
  location: string;
  type: string;
  image?: string;
  posterAvatar?: string;
  posterName?: string;
  keyKnowledgeSkills?: string[];
  benefits?: string[];
}

export default function JobCard({
  id,
  title,
  location,
  type,
  image,
  posterAvatar,
  posterName,
  keyKnowledgeSkills = [],
  benefits = [],
}: JobCardProps) {
  const hasSkills = keyKnowledgeSkills.length > 0;
  const hasBenefits = benefits.length > 0;

  return (
    <Card
      component={Link}
      href={`/jobs/${id}`}
      variant="outlined"
      sx={{
        display: 'block',
        textDecoration: 'none',
        color: 'inherit',
        transition: 'box-shadow 0.2s, border-color 0.2s',
        '&:hover': {
          boxShadow: 2,
          borderColor: 'primary.main',
          '& .card-arrow': { color: 'primary.main' },
          '& .card-title': { color: 'primary.main' },
        },
      }}
    >
      <CardContent sx={{ p: 0, '&:last-child': { pb: 0 } }}>
        <Box sx={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
          <Box sx={{ flex: 1, minWidth: 0, p: 3, display: 'flex', alignItems: 'flex-start', gap: 2 }}>
            {image && (
              <Box sx={{ width: 100, flexShrink: 0, borderRadius: 1, overflow: 'hidden', bgcolor: 'grey.200' }}>
                <Box component="img" src={image} alt="" sx={{ width: '100%', height: 72, objectFit: 'cover' }} />
              </Box>
            )}
          <Box sx={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography className="card-title" variant="h6" fontWeight={600} sx={{ mb: 1, transition: 'color 0.2s' }}>
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {location} · {type}
            </Typography>
            {(hasSkills || hasBenefits) && (
              <Box sx={{ mt: 1.5, display: 'flex', flexDirection: 'column', gap: 1 }}>
                {hasSkills && (
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, flexWrap: 'wrap' }}>
                    <ListIcon sx={{ fontSize: 18, color: 'text.secondary', mt: 0.25 }} />
                    <Typography variant="caption" color="text.secondary">
                      <strong>Key knowledge & skills:</strong> {keyKnowledgeSkills.slice(0, 5).join(' · ')}{keyKnowledgeSkills.length > 5 ? ' …' : ''}
                    </Typography>
                  </Box>
                )}
                {hasBenefits && (
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, flexWrap: 'wrap' }}>
                    <CheckCircleIcon sx={{ fontSize: 18, color: 'text.secondary', mt: 0.25 }} />
                    <Typography variant="caption" color="text.secondary">
                      <strong>Benefits:</strong> {benefits.slice(0, 4).join(', ')}{benefits.length > 4 ? ' …' : ''}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
            <IconButton className="card-arrow" size="small" sx={{ color: 'text.secondary', transition: 'color 0.2s' }} aria-hidden>
              <ArrowForwardIcon fontSize="small" />
            </IconButton>
            {(posterAvatar || posterName) && (
              <Box sx={{ flexShrink: 0 }}>
                {posterAvatar ? (
                  <Box
                    component="img"
                    src={posterAvatar}
                    alt={posterName ? `Posted by ${posterName}` : 'Poster'}
                    sx={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover', bgcolor: 'grey.200' }}
                  />
                ) : (
                  <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: 'grey.300', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: 12, fontWeight: 600 }}>
                      {(posterName || '?').charAt(0).toUpperCase()}
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </Box>
          </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
