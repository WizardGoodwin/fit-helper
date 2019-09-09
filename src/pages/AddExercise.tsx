import React, { FC } from 'react';

import {
  createStyles,
  Divider,
  FormControl,
  Grid,
  makeStyles,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Theme,
  Typography, Button,
} from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '500px'
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
    },
    mainGrid: {
      marginTop: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column'
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

interface State {
  name: string;
  muscleGroup: string;
}

const AddExercise: FC = () => {
  const classes = useStyles();

  const [values, setValues] = React.useState<State>({
    name: '',
    muscleGroup: ''
  });

  const handleChange = (name: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement | { name?: string, value: unknown }>) => {
    setValues({
      ...values,
      [name]: event.target.value
    });
  };

  const submitForm = () => {
    console.log(values)
  };

  return (
    <Grid container className={classes.mainGrid}>
      <Typography variant="h5" gutterBottom>
        Добавить упражнение
      </Typography>
      <Divider />
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="name"
          label="Название"
          className={classes.textField}
          value={values.name}
          onChange={handleChange('name')}
          margin="normal"
          variant="outlined"
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Группа мышц</InputLabel>
          <Select
            id="muscleGroup"
            value={values.muscleGroup}
            onChange={handleChange('muscleGroup')}
          >
            <MenuItem value={'Спина'}>Спина</MenuItem>
            <MenuItem value={'Грудь'}>Грудь</MenuItem>
            <MenuItem value={'Плечи'}>Плечи</MenuItem>
          </Select>
          <Button
            variant="contained"
            color="primary"
            className={classes.submitBtn}
            onClick={submitForm}
          >
            Добавить
          </Button>
        </FormControl>
      </form>
    </Grid>
  );
};

export default AddExercise;
