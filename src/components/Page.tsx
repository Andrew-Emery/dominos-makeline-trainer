import { Container, Typography, Stack } from '@mui/material';

interface PageProps {
  title: string;
  children: React.ReactNode;
}

const Page = ({ title, children }: PageProps) => {
  return (
    <Container maxWidth="sm" sx={{ px: { xs: 1, sm: 2 }, py: { xs: 2, sm: 4 } }}>
      <Stack spacing={2}>
        <Typography variant="h4" gutterBottom sx={{ fontSize: { xs: '2rem', sm: '2.5rem' } }}>
          {title}
        </Typography>
        {children}
      </Stack>
    </Container>
  );
};

export default Page; 