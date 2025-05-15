import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CrustCodes from './pages/CrustCodes';
import PortionCodes from './pages/PortionCodes';
import IngredientCodes from './pages/IngredientCodes';
import MeatPortions from './pages/MeatPortions';
import PreBuilt from './pages/PreBuilt';
import TestPage from './pages/TestPage';

// Create a theme that matches Domino's branding
const theme = createTheme({
  palette: {
    primary: {
      main: '#E31837', // Domino's red
    },
    secondary: {
      main: '#FFFFFF', // White
    },
    dominosBlue: {
      main: '#006491', // Domino's blue
      light: '#0077B0',
      dark: '#004B6A',
    },
    background: {
      default: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
    },
  },
});

// Extend the theme to include custom colors
declare module '@mui/material/styles' {
  interface Palette {
    dominosBlue: Palette['primary'];
  }
  interface PaletteOptions {
    dominosBlue?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    dominosBlue: true;
  }
}

function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const redirect = params.get('redirect');
    if (redirect) {
      navigate(redirect, { replace: true });
    }
    // Only run on initial mount
    // eslint-disable-next-line
  }, []);

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      bgcolor: 'background.default',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      <Box component="main" sx={{ flex: 1, py: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/crust-codes" replace />} />
          <Route path="/crust-codes" element={<CrustCodes />} />
          <Route path="/portion-codes" element={<PortionCodes />} />
          <Route path="/ingredient-codes" element={<IngredientCodes />} />
          <Route path="/meat-portions" element={<MeatPortions />} />
          <Route path="/pre-built" element={<PreBuilt />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </Box>
      <Footer />
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename="/dominos-makeline-trainer">
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
