import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import {
  createStyles,
  Divider,
  Grid,
  makeStyles,
  Theme,
  Button, Typography,
} from '@material-ui/core';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator';

import { IUser } from '../models/user.interface';
import Spinner from '../shared/Spinner/Spinner';


interface IState {
  username: string;
  fullName?: string;
  email?: string;
}

interface IProps {
  userStore: {
    user: IUser;
    isLoading: boolean;
    isUpdating: boolean;
    getUser: () => any;
    updateUser: (user: IUser) => any;
    error: string;
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '400px'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    mainGrid: {
      marginTop: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    submitBtn: {
      marginTop: theme.spacing(3),
    },
    btnContainer: {
      justifyContent: 'space-around'
    },
    errorText: {
      color: theme.palette.error.main,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
      fontSize: 12,
    }
  }),
);

const Profile: FC<IProps> = inject('userStore')(
  observer(({ userStore }) => {
  const classes = useStyles();

  const initialState: IState = userStore.user;

  const [values, setValues] = useState<IState>(initialState);

  useEffect(() => {
    userStore.getUser();
  }, []);

    useEffect(() => {
      setValues(userStore.user);
    }, [userStore.user]);

  const handleChange = (name: keyof typeof values) => (event: ChangeEvent<HTMLInputElement | { name?: string, value: unknown }>) => {
    setValues({
      ...values,
      [name]: event.target.value
    });
  };

  const submitForm = () => {
      userStore.updateUser(values);
  };

  const handleCancel = () => setValues(initialState);

  return (
    <>
      {userStore.isLoading ? <Spinner /> :
        <Grid container className={classes.mainGrid}>
          <Divider />
          <ValidatorForm
            className={classes.container}
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
            <Grid container className={classes.btnContainer}>
              <Grid item>
                {userStore.isUpdating ? <Spinner /> :
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.submitBtn}
                    type="submit"
                  >
                    Сохранить
                  </Button>
                }
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.submitBtn}
                  onClick={handleCancel}
                >
                  Отменить
                </Button>
              </Grid>
            </Grid>
          </ValidatorForm>
        </Grid>
      }
    </>

  );
}));

export default Profile;
