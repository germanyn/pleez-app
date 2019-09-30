import React from 'react'
import { Typography, Container, Box } from '@material-ui/core';
import ListaCardapioAdmin from 'cardapio/ListaCardapioAdmin';

interface Props{}

const Cardapio: React.FunctionComponent<Props> = (props) => {
  return (
    <Container >
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cardápio
        </Typography>
        <ListaCardapioAdmin />
      </Box>
    </Container>
  )
}

export default Cardapio