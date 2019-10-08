import React, { useImperativeHandle, forwardRef } from 'react'
import { makeStyles, Theme, createStyles, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@material-ui/core";

export type Props = {
  onConfirma?: (produtoInput: Required<ProdutoInput>) => void
  children?: React.ReactElement
}

export type Ref = {
  setProduto: React.Dispatch<React.SetStateAction<ProdutoInput>>
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export type ProdutoInput = {
  nome?: string
  preco?: string
}

const produtoInicial = {
  nome: undefined,
  preco: undefined,
}

const DialogProduto: React.RefForwardingComponent<Ref, Props> = (
  props,
  ref,
) => {
  const [opened, setOpened] = React.useState(false);
  const [produto, setProduto] = React.useState<ProdutoInput>({...produtoInicial});

  const handleClickOpen = () => {
    setProduto({...produtoInicial})
    setOpened(true);
  };

  useImperativeHandle(ref, ()=>({
    setProduto,
    setOpened,
  }))

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
      { props.children && React.cloneElement(props.children, {
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
                step: "0.01"
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

export default forwardRef(DialogProduto)