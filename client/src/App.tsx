import React from 'react';
import MainToolbar from './components/core/MainToolbar';
import theme from './theme';
import { CssBaseline, Theme } from '@material-ui/core';
import { makeStyles, createStyles, ThemeProvider } from '@material-ui/styles';
import MainDrawer from './components/core/MainDrawer';
import MainLayout from './components/core/MainLayout';
import { Router } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import 'App.css'
import client from 'plugins/apollo-client';
import history from 'app-history'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      height: '100vh',
    },
  })
)

const App = () => {
  const classes = useStyles()
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <CssBaseline />
          <div className={classes.root}>
            <MainToolbar
              drawerOpen={ drawerOpen }
              onOpenDrawer={() => setDrawerOpen(!drawerOpen)}
            />
            <MainDrawer
              open={ drawerOpen }
              onToggleDrawer={() => setDrawerOpen(!drawerOpen)}
            />
            <MainLayout />
          </div>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
