import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter basename='/expense-ui'>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
