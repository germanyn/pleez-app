import React, { forwardRef, useImperativeHandle } from 'react'
import Icon from "@mdi/react";
import { Fab, makeStyles, Theme, createStyles, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from "@material-ui/core";
import theme from "theme";
import { mdiPlus } from "@mdi/js";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'fixed',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
);

export type CategoriaInput = {
  nome: string
}

export type Props = {
  children?: any
  onConfirma?: (categoria: CategoriaInput) => void
  categoriaInicial?: CategoriaInput
}

export type Ref = {
  setCategoria: React.Dispatch<React.SetStateAction<CategoriaInput>>
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
}

const categoriaInicialDefault = {
  nome: '',
}

const DialogCategoria: React.RefForwardingComponent<Ref, Props> = ({
  categoriaInicial = { ...categoriaInicialDefault },
  ...props
}, ref) => {
  const classes = useStyles();
  const [open, setOpened] = React.useState(false);
  const [categoria, setCategoria] = React.useState({...categoriaInicial});

  const handleClickOpen = () => {
    setCategoria({ ...categoriaInicial })
    setOpened(true);
  };

  const handleCancelar = () => {
    setOpened(false);
  };

  const handleConfirma = () => {
    props.onConfirma && props.onConfirma(categoria);
    setOpened(false);
  };

  useImperativeHandle(ref, () => ({
    setCategoria,
    setOpened,
  }))
  
  return (
    <React.Fragment>
      { React.cloneElement(props.children, {
        onClick: handleClickOpen,
      }) }
      <Dialog
        open={open}
        onClose={ handleCancelar }
        aria-labelledby="form-dialog-title"
      >
        <form onSubmit={(evento)=>{
          evento.preventDefault()
          handleConfirma()
        }}>
          <DialogTitle id="form-dialog-title"> Nova Categoria</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nome"
              fullWidth
              onChange={ (evento) => setCategoria({
                ...categoria,
                nome: evento.target.value,
              }) }
              value={ categoria.nome }
            />
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              type="submit"
            >
              Confirma
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  )
}

export default forwardRef(DialogCategoria)