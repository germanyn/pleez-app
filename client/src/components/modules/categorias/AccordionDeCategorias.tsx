import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import PanelDaCategoria from './PanelDaCategoria';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
  }),
);

const AccordionDeCategorias: React.RefForwardingComponent<Ref, Props> = ({
  categorias,
  ...props
}, ref) => {
  const classes = useStyles();
  const [ expanded, setExpanded ] = useState<string | undefined>(undefined)

  useImperativeHandle(ref, ()=>({
    setExpanded,
  }))

  return (
    <Paper className={classes.root}>
      <React.Fragment>
        { categorias.length
          ? categorias.map(categoria=>
              <PanelDaCategoria
                categoria = { categoria }
                key = { categoria._id }
                expanded = { categoria._id === expanded }
                onExpand = { (id) => setExpanded(id === expanded ? undefined : id) }
              />
            )
          : <Typography variant="h5" style={{ textAlign: 'center', }}>
            Nenhuma Categoria registrada...
          </Typography>
        }
      </React.Fragment>
    </Paper>
  )
}

export type Props = { 
  categorias: Categoria[],
}

export type Ref = { 
  setExpanded: (idCategoria: string) => void,
}

export default forwardRef(AccordionDeCategorias)