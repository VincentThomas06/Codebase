import styled, { ThemeProvider } from 'styled-components';
import { DarkTheme } from '@v-thomas/libs/thunder/themes';
import { StrictMode } from 'react';
import { App } from './router';
import { SnackbarProvider } from 'notistack';
import { HashRouter } from 'react-router-dom';

const Styles = styled.div`
  background-color: ${({ theme }: { theme: { background: { primary: string } } }) =>
    theme.background.primary};
  min-height: 100vh;
  font-size: 16px;
  margin: 0;
`;

export const Root = () => {
  return (
    <StrictMode>
      <ThemeProvider theme={DarkTheme}>
        <SnackbarProvider maxSnack={3}>
          <Styles>
            <HashRouter>
              <App />
            </HashRouter>
          </Styles>
        </SnackbarProvider>
      </ThemeProvider>
    </StrictMode>
  );
};
