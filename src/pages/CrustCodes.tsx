import { List, ListItem, Paper, Typography, Box } from '@mui/material';
import { trainingData } from '../data/trainingData';
import Page from '../components/Page';

const CrustCodes = () => {
  return (
    <Page title="Crust Codes">
      <List>
        {trainingData['crust-codes'].map((item) => (
          <Paper 
            key={item.code} 
            elevation={2} 
            sx={{ 
              mb: 2,
              backgroundColor: 'background.paper',
              '&:hover': {
                backgroundColor: 'action.hover',
              },
            }}
          >
            <ListItem>
              <Box sx={{ width: '100%' }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  {item.code}
                </Typography>
                <Typography variant="body1">
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

export default CrustCodes; 