import React from 'react'
import { AppBar, IconButton, Typography, Toolbar, Theme, Menu, MenuItem } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, createStyles, withTheme } from '@material-ui/styles';
import clsx from 'clsx';
import { useLocation } from 'react-router';
import rotas from 'rotas';


const drawerWidth = 240
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    hide: {
      display: 'none',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    spacer: {
      flexGrow: 1,
    },
  }),
);

interface Props {
  onOpenDrawer?: () => void
  drawerOpen?: boolean
}

const MainToolbar: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const location = useLocation()

  const rotaAtual = Object.values(rotas).find(rota=>{
    if (rota.path === '/') return
    return location.pathname.startsWith(rota.path)
  })
  
  return (
    <AppBar className={clsx(classes.appBar, {
      [classes.appBarShift]: props.drawerOpen,
    })}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => props.onOpenDrawer && props.onOpenDrawer()}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: props.drawerOpen,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" color="inherit" noWrap>
          { rotaAtual ? rotaAtual.nome : '' }
        </Typography>
        <div className={classes.spacer} />
      </Toolbar>
    </AppBar>
  )
}

export default withTheme(MainToolbar)