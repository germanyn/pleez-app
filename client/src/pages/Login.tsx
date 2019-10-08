import * as React from 'react';
import { Card, Toolbar, Typography, Container, FormGroup, TextField, CardContent } from '@material-ui/core';
type Props = {
  
};
export function Login(props: Props) {
  const [credenciais, setCredenciais] = React.useState({...credenciaisIniciais})
  return (
    <Container>
      <Card>
        <Toolbar>
          <Typography variant="h4">Login</Typography>
        </Toolbar>
        <CardContent>
          <FormGroup>
            <TextField
              label="Login"
              value={credenciais.login}
              onChange={(event)=>setCredenciais({
                ...credenciais,
                login: event.currentTarget.value,
              })}
            />
            <TextField
              label="Senha"
              value={credenciais.senha}
              onChange={(event)=>setCredenciais({
                ...credenciais,
                senha: event.currentTarget.value,
              })}
            />
          </FormGroup>
        </CardContent>
      </Card>
    </Container>
  );
};

const credenciaisIniciais = {
  login: '',
  senha: '',
}