import { List, ListItem, Paper, Typography, Box } from '@mui/material';
import { trainingData } from '../data/trainingData';
import Page from '../components/Page';

const IngredientCodes = () => {
  return (
    <Page title="Ingredient Codes">
      <List>
        {trainingData['ingredient-codes'].map((item) => (
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
                {item.glutenContaining && (
                  <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                    Contains Gluten
                  </Typography>
                )}
              </Box>
            </ListItem>
          </Paper>
        ))}
      </List>
    </Page>
  );
};

export default IngredientCodes; 