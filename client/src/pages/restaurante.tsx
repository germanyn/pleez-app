import React from 'react'
import { Typography, Container, Box } from '@material-ui/core';

interface Props{}

const Home: React.FunctionComponent<Props> = (props) => {
  return (
    <Container maxWidth="sm" >
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Restaurante
        </Typography>
      </Box>
    </Container>
  )
}

export default Home