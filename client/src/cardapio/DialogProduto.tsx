import React from 'react'
import { makeStyles, Theme, createStyles, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  }),
);

type Props = {
  onConfirma?: (produtoInput: Required<ProdutoInput>) => void
  children: React.ReactElement
}

export type ProdutoInput = {
  nome?: string
  preco?: string
}

const produtoInicial = {
  nome: undefined,
  preco: undefined,
}

const DialogProduto = (props: Props) => {
  const [opened, setOpened] = React.useState(false);
  const [produto, setProduto] = React.useState<ProdutoInput>({...produtoInicial});

  const handleClickOpen = () => {
    setProduto({...produtoInicial})
    setOpened(true);
  };

  const handleCancelar = () => {
    setOpened(false);
  };

  const handleConfirma = () => {
    if(!produto.nome) {
      alert('Informe um Nome')
    }
    if(!produto.preco) {
      alert('Informe um Preço')
    }
    props.onConfirma && props.onConfirma(
      produto as Required<ProdutoInput>
    );
    setOpened(false);
  };
  
  return (
    <React.Fragment>
      { React.cloneElement(props.children, {
        onClick: handleClickOpen,
      }) }
      <Dialog
        open={opened}
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
              defaultValue=""
              onChange={ (evento) => setProduto({
                  ...produto,
                  nome: evento.target.value
                })
              }
              value={ produto.nome || '' }
            />
            <TextField
              margin="dense"
              label="Preço"
              fullWidth
              type="number"
              inputProps={{
                step: "0,01"
              }}
              onChange={ (evento) => setProduto({
                  ...produto,
                  preco: evento.target.value,
                })
              }
              value={ produto.preco || '' }
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

export default DialogProduto