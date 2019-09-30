import React from "react";
import { Route, Switch } from "react-router-dom"
import Home from 'pages/Home';
import { makeStyles, createStyles, Theme, Container } from "@material-ui/core";
import Cardapio from "pages/admin/Cardapio";

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    content: {
      flexGrow: 1,
      paddingTop: theme.spacing(1),
      [theme.breakpoints.up('sm')]: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
      },
    },
    toolbar: theme.mixins.toolbar,
  }),
);

interface Props {
  open?: boolean
  onToggleDrawer?: () => void
}

const MainLayout: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles()

  return (
    <main className={classes.content}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/admin/cardapio" component={ Cardapio } />
      </Switch>
    </main>
  )
}

export default MainLayout