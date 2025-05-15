import { List, ListItem, Paper, Typography, Box, Chip } from '@mui/material';
import { trainingData, getIngredientName, parseTopping } from '../data/trainingData';
import Page from '../components/Page';

const portionCodeMap: Record<string, string> = {
  '-': 'Minus',
  '~': 'Less',
  '+': 'Extra',
  '2': 'Double',
};

const PreBuilt = () => {
  return (
    <Page title="Pre-Built Pizzas">
      <List>
        {trainingData['pre-built'].map((item) => (
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
            <ListItem alignItems="flex-start">
              <Box sx={{ width: '100%' }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Code: {item.code}
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {item.toppings.map((topping) => {
                    const { portion, code } = parseTopping(topping);
                    const portionLabel = portion ? `${portionCodeMap[portion] || portion}` : '';
                    return (
                      <Chip
                        key={topping}
                        label={
                          portion
                            ? `${portion}${code}: ${portionLabel} ${getIngredientName(code)}`
                            : `${code}: ${getIngredientName(code)}`
                        }
                        size="small"
                        sx={{
                          backgroundColor: theme => theme.palette.dominosBlue.main,
                          color: 'white',
                          '&:hover': {
                            backgroundColor: theme => theme.palette.dominosBlue.dark,
                          },
                        }}
                      />
                    );
                  })}
                </Box>
                {item.notes && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
                    Note: {item.notes}
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

export default PreBuilt; 