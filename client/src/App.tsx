import React from 'react';
import MainToolbar from './components/MainToolbar';
import theme from './theme';
import { CssBaseline, Theme } from '@material-ui/core';
import { makeStyles, createStyles, ThemeProvider } from '@material-ui/styles';
import MainDrawer from './components/MainDrawer';
import MainLayout from './components/MainLayout';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
const client = new ApolloClient({
  uri: "http://localhost:4000"
});

const drawerWidth = 240
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      // display: 'flex',
    },
  })
)

const history = createBrowserHistory();

const App = () => {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <CssBaseline />
          <MainToolbar onOpenDrawer={() => setDrawerOpen(!drawerOpen)} />
          <MainDrawer open={drawerOpen} onToggleDrawer={() => setDrawerOpen(!drawerOpen)}/>
          <MainLayout />
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;