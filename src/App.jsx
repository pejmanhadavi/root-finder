import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Copyright } from './components/copy-right';
import { Header } from './components/header';
import Box from '@mui/material/Box';
import { SearchForm } from './components/search-form';

const theme = createTheme();

export default function SignIn() {

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Header />
          <SearchForm />
        </Box>
      </Container>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </ThemeProvider>
  );
}