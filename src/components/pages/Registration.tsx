import React, { ChangeEvent, FC, useState } from 'react';
import { Redirect } from 'react-router';

import { inject, observer } from 'mobx-react';
import {
  Button,
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import { IUser } from '../../models/user.interface';
import Spinner from '../shared/Spinner';

interface IState {
  username: string;
  password: string;
  fullName: string;
  email: string;
}

interface IProps {
  userStore: {
    isLoading: boolean;
    isRegistered: boolean;
    error: string | null;
    register: (regData: IUser) => any;
  };
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
    },
    errorText: {
      color: theme.palette.error.main,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      fontSize: 12,
    }
  }),
);

const Registration: FC<IProps> = inject('userStore')(
  observer(({
    userStore,
  }) => {
  const classes = useStyles();

  const initialState: IState = {
    username: '',
    password: '',
    fullName: '',
    email: ''
  };

  const [values, setValues] = useState<IState>(initialState);

  const handleChange = (name: keyof typeof values) => (event: ChangeEvent<HTMLInputElement | { name?: string, value: unknown }>) => {
    setValues({
      ...values,
      [name]: event.target.value
    });
  };

  const submitForm = () => userStore.register(values);

  return (
    <>
      <Grid container className={classes.mainGrid}>
        <Typography variant="h5" gutterBottom>
          Регистрация
        </Typography>
        <Divider />
        <ValidatorForm
          className={classes.regForm}
          onSubmit={submitForm}
        >
          <TextValidator
            name="username"
            label="Логин"
            className={classes.textField}
            value={values.username}
            onChange={handleChange('username')}
            margin="normal"
            variant="outlined"
            validators={['required']}
            errorMessages={['Это поле обязательное']}
          />
          <TextValidator
            name="password"
            label="Пароль"
            type="password"
            className={classes.textField}
            value={values.password}
            onChange={handleChange('password')}
            margin="normal"
            variant="outlined"
            validators={['required']}
            errorMessages={['Это поле обязательное']}
          />
          <TextValidator
            name="fullName"
            label="Полное имя"
            className={classes.textField}
            value={values.fullName}
            onChange={handleChange('fullName')}
            margin="normal"
            variant="outlined"
          />
          <TextValidator
            name="email"
            label="Email"
            className={classes.textField}
            value={values.email}
            onChange={handleChange('email')}
            margin="normal"
            variant="outlined"
            validators={['isEmail']}
            errorMessages={['Введите корректную почту']}
          />
          {userStore.error && (
            <Typography variant="body1" gutterBottom className={classes.errorText}>
              {userStore.error}
            </Typography>
          )}
          {userStore.isLoading ? <Spinner /> : (
            <Button
              variant="contained"
              color="primary"
              className={classes.submitBtn}
              type="submit"
            >
              Зарегистрироваться
            </Button>
          )}
        </ValidatorForm>
      </Grid>
      {userStore.isRegistered && <Redirect to={{
        pathname: '/',
        state: { message: 'Добро пожаловать, вы успешно зарегистрированы!' }
      }} />}
    </>
  );
}));

export default Registration;
