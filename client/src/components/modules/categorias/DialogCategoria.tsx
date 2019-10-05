import React from 'react'
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

type Props = {
  onConfirma?: (nomeCategoria: string) => void
}

const DialogCategoria = (props: Props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [nomeCategoria, setNomeCategoria] = React.useState('');

  const handleClickOpen = () => {
    setNomeCategoria('')
    setOpen(true);
  };

  const handleCancelar = () => {
    setOpen(false);
  };

  const handleConfirma = () => {
    props.onConfirma && props.onConfirma(nomeCategoria);
    setOpen(false);
  };
  
  return (
    <React.Fragment>
      <Fab
        className={classes.fab}
        color="primary"
        onClick={handleClickOpen}
      >
        <Icon
          color={theme.palette.primary.contrastText}
          path={mdiPlus}
          size={1}
        />
      </Fab>
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
              onChange={ (evento) => setNomeCategoria(evento.target.value) }
              value={ nomeCategoria }
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

export default DialogCategoria