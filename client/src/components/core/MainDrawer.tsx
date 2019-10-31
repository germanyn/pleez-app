import React from 'react'
import { makeStyles, createStyles, useTheme, withTheme } from "@material-ui/styles";
import { Drawer, List, ListItem, Divider, ListItemText, Theme, useMediaQuery, ListItemIcon, IconButton } from "@material-ui/core";
import logo from 'assets/logo.png'
import Icon from '@mdi/react'
import { Link as RouterLink, LinkProps as RouterLinkProps, useHistory } from 'react-router-dom';
import rotas from 'rotas';
import clsx from 'clsx';
import { mdiChevronLeft } from '@mdi/js';

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: {
      ...theme.mixins.toolbar,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      backgroundColor: theme.palette.primary.main,
    },
    drawer: {
      [theme.breakpoints.up('sm')]: {
        flexShrink: 0,
      },
    },
    drawerPapper: {
      // width: drawerWidth,
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    logoWrapper: {
      display: 'flex',
      flex: 1,
      height: theme.mixins.toolbar.minHeight,
      padding: 12,
    },
    logo: {
      maxHeight: '100%',
      maxWidth: '100%',
    }
  }),
);

const AdapterLink = React.forwardRef<HTMLAnchorElement, RouterLinkProps>((props, ref) => (
  <RouterLink innerRef={ref} {...props} />
));

interface Props {
  open?: boolean
  onToggleDrawer?: () => void
}

const MainDrawer: React.FunctionComponent<Props> = (props) => {
  const theme = useTheme<Theme>()
  const classes = useStyles();

  const itensMenu = [
    rotas['login'],
    rotas['registrar-restaurante'],
    rotas['home'],
    rotas['pedidos'],
    rotas['editar-cardapios'],
    rotas['editar-restaurante'],
  ]

  return (
    <nav className={classes.drawer}>
      <Drawer
        variant={ useMediaQuery(theme.breakpoints.up('sm')) ? "permanent" : "temporary" }
        open={useMediaQuery(theme.breakpoints.up('sm')) || props.open}
        onClose={() => props.onToggleDrawer && props.onToggleDrawer()}
        ModalProps={{
          keepMounted: true,
        }}
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: props.open,
          [classes.drawerClose]: !props.open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: props.open,
            [classes.drawerClose]: !props.open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <div className={classes.logoWrapper}>
            <img
              src={logo}
              alt="Logo"
              className={classes.logo}
            />
          </div>
          <IconButton
            onClick={() => props.onToggleDrawer && props.onToggleDrawer()}
          >
            <Icon
              path={mdiChevronLeft}
              size={1}
              color={theme.palette.primary.contrastText}
            />
          </IconButton>
        </div>
        <Divider />
        <div>
          <List>
            {itensMenu.map(item => (
              <ListItem
                button
                key={item.nome}
                component={AdapterLink as any}
                to={item.path}
                activeclassname="primary"
              >
                <ListItemIcon>
                  <Icon path={item.icone || ''} size={1} />
                </ListItemIcon>
                <ListItemText primary={item.nomeDoMenu} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </nav>
  )
}

export default withTheme(MainDrawer)