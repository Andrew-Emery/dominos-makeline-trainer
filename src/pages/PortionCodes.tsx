import { List, ListItem, Paper, Typography, Box } from '@mui/material';
import { trainingData } from '../data/trainingData';
import Page from '../components/Page';

const PortionCodes = () => {
  return (
    <Page title="Portion Codes">
      <List sx={{ px: { xs: 1, sm: 0 } }}>
        {trainingData['portion-codes'].map((item) => (
          <Paper 
            key={item.code} 
            elevation={2} 
            sx={{ 
              mb: { xs: 2, sm: 2.5 },
              mx: { xs: 0, sm: 0 },
              p: { xs: 2, sm: 3 },
              backgroundColor: 'background.paper',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItem disableGutters sx={{ px: 0 }}>
              <Box sx={{ width: '100%' }}>
                <Typography variant="h6" color="primary" gutterBottom sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }}>
                  {item.code}
                </Typography>
                <Typography variant="body1" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                  {item.name}
                </Typography>
              </Box>
            </ListItem>
          </Paper>
        ))}
      </List>
    </Page>
  );
};

export default PortionCodes; 