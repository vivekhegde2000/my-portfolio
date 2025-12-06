import { createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';

const getThemeOptions = (mode: 'light' | 'dark'): ThemeOptions => ({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#818cf8' : '#6366f1',
      light: mode === 'dark' ? '#a5b4fc' : '#818cf8',
      dark: mode === 'dark' ? '#6366f1' : '#4f46e5',
    },
    secondary: {
      main: mode === 'dark' ? '#f472b6' : '#ec4899',
      light: mode === 'dark' ? '#f9a8d4' : '#f472b6',
      dark: mode === 'dark' ? '#ec4899' : '#db2777',
    },
    background: {
      default: mode === 'dark' ? '#0f0f23' : '#fafafa',
      paper: mode === 'dark' ? '#1a1a2e' : '#ffffff',
    },
    text: {
      primary: mode === 'dark' ? '#e2e8f0' : '#1e293b',
      secondary: mode === 'dark' ? '#94a3b8' : '#64748b',
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: 'clamp(2.5rem, 5vw, 4rem)',
    },
    h2: {
      fontWeight: 600,
      fontSize: 'clamp(2rem, 4vw, 3rem)',
    },
    h3: {
      fontWeight: 600,
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
    },
    h4: {
      fontWeight: 600,
      fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.125rem',
    },
    h6: {
      fontWeight: 500,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          padding: '12px 24px',
          borderRadius: '8px',
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-secondary-dark) 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});

export const createCustomTheme = (mode: 'light' | 'dark') => createTheme(getThemeOptions(mode));
