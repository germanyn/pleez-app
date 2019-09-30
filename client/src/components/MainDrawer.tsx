import React from 'react'
import { makeStyles, createStyles, useTheme, withTheme } from "@material-ui/styles";
import { Drawer, List, ListItem, Divider, ListItemText, Theme, useMediaQuery, ListItemIcon } from "@material-ui/core";
import logo from 'assets/logo.png'
import {
  mdiAccountGroup,
  mdiMapMarker,
  mdiCalendarMonthOutline,
  mdiHome
} from '@mdi/js'
import Icon from '@mdi/react'
import { NavLink } from 'react-router-dom';

const drawerWidth = 240

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerPapper: {
      width: drawerWidth,
    },
    logoWrapper: {
      ...theme.mixins.toolbar,  
      padding: 12,
      backgroundColor: 'rgb(194, 12, 12);'
    },
    logo: {
      maxHeight: '100%',
      maxWidth: '100%',
    }
  }),
);

interface Props {
  open?: boolean
  onToggleDrawer?: () => void
}

const MainDrawer: React.FunctionComponent<Props> = (props) => {
  const theme = useTheme<Theme>()
  const classes = useStyles();

  interface ItemMenu {
    nome: string
    icone: string
    path: string
  }

  const itensMenu: ItemMenu[] = [
    {
      nome: 'Home',
      icone: mdiHome,
      path: '',
    },
    {
      nome: 'Irmãos',
      icone: mdiAccountGroup,
      path: '/irmaos',
    },
    {
      nome: 'Lojas',
      icone: mdiMapMarker,
      path: '/lojas',
    },
    {
      nome: 'Calendários',
      icone: mdiCalendarMonthOutline,
      path: '/calendarios',
    },
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
        classes={{
          paper: classes.drawerPapper,
        }}
      >
        <div className={classes.logoWrapper}>
          <img
            src={logo}
            alt="Logo"
            className={classes.logo}
          />
        </div>
        <Divider />
        <div>
          <List>
            {itensMenu.map(item => (
              <ListItem
                button
                key={item.nome}
                component={NavLink}
                to={item.path}
                activeClassName="primary"
              >
                <ListItemIcon>
                  <Icon path={item.icone} size={1} />
                </ListItemIcon>
                <ListItemText primary={item.nome} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </nav>
  )
}

export default withTheme(MainDrawer)