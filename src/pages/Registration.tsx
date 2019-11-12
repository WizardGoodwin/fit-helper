import React, { ChangeEvent, FC, useState } from 'react';

import {
  Button,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';

interface IState {
  username: string;
  password: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainGrid: {
      marginTop: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    regForm: {
      display: 'flex',
      flexDirection: 'column',
      width: '400px'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    submitBtn: {
      marginTop: theme.spacing(3),
    }
  }),
);

const Registration: FC = () => {
  const classes = useStyles();

  const initialState: IState = {
    username: '',
    password: '',
  };

  const [values, setValues] = useState<IState>(initialState);

  const handleChange = (name: keyof typeof values) => (event: ChangeEvent<HTMLInputElement | { name?: string, value: unknown }>) => {
    setValues({
      ...values,
      [name]: event.target.value
    });
  };

  const submitForm = () => {
    console.log(values);
  };

  return (
    <>
        <Grid container className={classes.mainGrid}>
          <Typography variant="h5" gutterBottom>
            Регистрация
          </Typography>
          <Divider />
          <form className={classes.regForm} noValidate autoComplete="off">
            <TextField
              id="username"
              label="Логин"
              className={classes.textField}
              value={values.username}
              onChange={handleChange('username')}
              margin="normal"
              variant="outlined"
            />
            <TextField
              id="password"
              label="Пароль"
              type="password"
              className={classes.textField}
              value={values.password}
              onChange={handleChange('password')}
              margin="normal"
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.submitBtn}
              onClick={submitForm}
            >
              Зарегистрироваться
            </Button>
          </form>
        </Grid>
    </>

  );
};

export default Registration;
