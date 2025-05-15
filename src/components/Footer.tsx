import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 2, sm: 3 },
        px: { xs: 1, sm: 2 },
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[100],
        borderTop: '1px solid',
        borderColor: 'divider',
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center" sx={{ fontSize: { xs: '0.95rem', sm: '1rem' } }}>
        This is an unofficial training tool and is not affiliated with Domino's Pizza Inc.
        {' '}
        <Link
          href="https://www.dominos.com"
          target="_blank"
          rel="noopener noreferrer"
          color="inherit"
          underline="hover"
        >
          Visit the official Domino's website
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer; 