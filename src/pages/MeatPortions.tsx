import { List, ListItem, Paper, Typography, Box } from '@mui/material';
import { trainingData } from '../data/trainingData';
import Page from '../components/Page';

const MeatPortions = () => {
  return (
    <Page title="Meat Portions">
      <List>
        {trainingData['meat-portions'].map((item) => (
          <Paper 
            key={item.pizza} 
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
                  {item.pizza}
                </Typography>
                <Typography variant="body1">
                  {item.slices} portions
                </Typography>
              </Box>
            </ListItem>
          </Paper>
        ))}
      </List>
    </Page>
  );
};

export default MeatPortions; 