import React from 'react'
import { Typography, Container, Box } from '@material-ui/core';

interface Props{}

const Home: React.FunctionComponent<Props> = (props) => {
  return (
    <Box my={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Home
      </Typography>
    </Box>
  )
}

export default Home