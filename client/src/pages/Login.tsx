import * as React from 'react';
import {
  Card,
  Toolbar,
  Typography,
  Container,
  CardContent,
  Grid,
  Button,
  CardActions,
} from '@material-ui/core';
import {
  TextField,
} from 'formik-material-ui';
import theme from 'theme'
import rotas from 'rotas';
import { NavLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { obrigatorio } from 'utils/regras-de-forms';
import { LOGAR_RESTAURANTE } from 'graphql/mutations/auth';
import { useMutation } from 'react-apollo';
import { withTheme, makeStyles } from '@material-ui/styles';
import { logar } from 'utils/auth-utils';

const useStyles = makeStyles(() => ({
  textField: {
    height: '80px'
  },
}));

function Login(props: Props) {
  const classes = useStyles()
  const [ logarRestaurante, { error } ] = useMutation(LOGAR_RESTAURANTE, {
    onCompleted: ({logarRestaurante}) => {
      logar(logarRestaurante)
    },
  });

  return (
    <Container>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} sm={8} md={4}>
          <Formik
            initialValues={credenciaisIniciais}
            validateOnBlur
            onSubmit = { (async({ email, senha }, { setSubmitting }) => {
              try {
                await logarRestaurante({
                  variables: {
                    email,
                    senha,
                  }
                })
              } finally {
                setSubmitting(false)
              }
            })}
          >
            {({ isSubmitting }) => (
              <Form>
                <Card>
                  <Toolbar style={{
                    color: theme.palette.primary.contrastText,
                    backgroundColor: theme.palette.primary.main,
                  }}>
                    <Typography variant="h5">Login</Typography>
                  </Toolbar>
                  <CardContent style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    <Field
                      className={classes.textField}
                      component={TextField}
                      label="E-mail"
                      name="email"
                      type="email"
                      required
                      validate={obrigatorio}
                    />
                    <Field
                      className={classes.textField}
                      component={TextField}
                      label="Senha"
                      name="senha"
                      type="password"
                      required
                      validate={obrigatorio}
                    />
                  </CardContent>
                  <CardActions >
                    <Button
                      fullWidth
                      color="primary"
                      variant="contained"
                      disabled={isSubmitting}
                      type="submit"
                    >
                      Entrar
                    </Button>
                  </CardActions>
                  { error && (<p> { error.message }</p>) }
                  <div style={{
                    margin: theme.spacing(1),
                    textAlign: 'center',
                  }}>
                    <NavLink
                      style={{
                        color: 'grey',
                        textDecoration: 'underline',
                      }}
                      to={rotas["registrar-restaurante"].path}
                    > Ainda não possuo uma conta </NavLink>
                  </div>
                </Card>
              </Form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </Container>
  );
};

export default withTheme(Login)

type Props = {
  
};

const credenciaisIniciais = {
  email: '',
  senha: '',
}