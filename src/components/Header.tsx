import { AppBar, Toolbar, Typography, Tabs, Tab, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const getTabValue = (path: string) => {
    if (path === '/') return '/crust-codes';
    return path;
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'primary.main' }}>
      <Toolbar sx={{ flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, py: { xs: 1, sm: 0 } }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0, mr: { xs: 0, sm: 4 }, mb: { xs: 1, sm: 0 }, fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
          Domino's Training
        </Typography>
        <Box sx={{ flexGrow: 1, width: '100%', overflowX: { xs: 'auto', sm: 'visible' } }}>
          <Tabs 
            value={getTabValue(currentPath)}
            textColor="secondary"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons={false}
            sx={{
              minHeight: 40,
              '& .MuiTab-root': {
                color: 'rgba(255, 255, 255, 0.7)',
                '&.Mui-selected': {
                  color: 'white',
                },
                fontSize: { xs: '0.9rem', sm: '1rem' },
                minWidth: { xs: 90, sm: 120 },
                px: { xs: 1, sm: 2 },
              },
            }}
          >
            <Tab 
              label="Crust Codes" 
              value="/crust-codes"
              component={RouterLink}
              to="/crust-codes"
            />
            <Tab 
              label="Portion Codes" 
              value="/portion-codes"
              component={RouterLink}
              to="/portion-codes"
            />
            <Tab 
              label="Ingredient Codes" 
              value="/ingredient-codes"
              component={RouterLink}
              to="/ingredient-codes"
            />
            <Tab 
              label="Meat Portions" 
              value="/meat-portions"
              component={RouterLink}
              to="/meat-portions"
            />
            <Tab 
              label="Pre-Built" 
              value="/pre-built"
              component={RouterLink}
              to="/pre-built"
            />
            <Tab 
              label="Test" 
              value="/test"
              component={RouterLink}
              to="/test"
            />
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 