import { Container, Typography, Stack } from '@mui/material';

interface PageProps {
  title: string;
  children: React.ReactNode;
}

const Page = ({ title, children }: PageProps) => {
  return (
    <Container maxWidth={false} disableGutters sx={{ width: '100vw', minHeight: '100vh', px: { xs: 0, sm: 2 }, py: { xs: 1, sm: 4 } }}>
      <Stack spacing={2} sx={{ width: '100%', maxWidth: 600, mx: 'auto' }}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '2rem', sm: '2.5rem' }, px: { xs: 2, sm: 0 } }}>
          {title}
        </Typography>
        {children}
      </Stack>
    </Container>
  );
};

export default Page; 