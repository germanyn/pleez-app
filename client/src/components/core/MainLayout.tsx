import React from "react";
import { Route, Switch } from "react-router-dom"
import { makeStyles, withTheme, createStyles, Theme } from "@material-ui/core";
import rotas from "rotas";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      overflowX: "hidden",
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    main: {
      flexGrow: 1,
      paddingTop: theme.spacing(3),
      overflowX: "hidden",
      display: 'flex',
      flexDirection: 'column',
      flex: 1,
    },
    toolbarSpacing: {
      ...theme.mixins.toolbar,
      flexShrink: 0,
    }
  }),
);

interface Props {
  open?: boolean
  onToggleDrawer?: () => void
}

const MainLayout: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <div className = {classes.toolbarSpacing} />
      <main className={classes.main}>
        <Switch>
          {Object.entries(rotas).map(([key, rota])=>
            <Route
              key={key}
              exact={!rota.rotas}
              path={rota.path}
              render={props => (
                <rota.componente
                  {...props}
                  rotas={rota.rotas}
                />
              )}
            />
          )}
        </Switch>
      </main>
      </div>
  )
}

export default withTheme(MainLayout)