import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

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
  Button,
} from '@material-ui/core';

import { IMuscleGroup } from '../../models/muscle-group.interface';
import { IExercise } from '../../models/exercise.interface';
import Spinner from './Spinner';
import Snackbar from './Snackbar';


interface IState {
  name: string;
  muscleGroupId: number;
  weight: number;
}

interface IProps {
  exercisesStore?: {
    isLoading: boolean;
    isAdded: boolean;
    isUpdated: boolean;
    addExercise: (exercise: IExercise) => any;
    updateExercise: (exercise: IExercise) => any;
    clearState: () => any;
  };
  muscleGroupsStore?: {
    muscleGroups: IMuscleGroup[];
    isLoading: boolean;
    getMuscleGroups: () => any;
  };
  editedExercise?: IExercise;
  handleEditSuccess?: () => any;
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
    }
  }),
);

const ExerciseForm: FC<IProps> = inject('exercisesStore', 'muscleGroupsStore')(
  observer(({
  exercisesStore,
  muscleGroupsStore,
  editedExercise,
  handleEditSuccess,
}) => {
  const classes = useStyles();

  const initialState: IState = editedExercise ? editedExercise : {
    name: '',
    muscleGroupId: 0,
    weight: 0,
  };

  const [values, setValues] = useState<IState>(initialState);

  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    muscleGroupsStore!.getMuscleGroups();
  }, [muscleGroupsStore]);

  const handleChange = (name: keyof typeof values) => (event: ChangeEvent<HTMLInputElement | { name?: string, value: unknown }>) => {
    setValues({
      ...values,
      [name]: event.target.value
    });
  };

  const submitForm = () => {
    if (editedExercise) {
      exercisesStore!.updateExercise(values);
    } else {
      exercisesStore!.addExercise(values);
    }
  };

  if (exercisesStore!.isAdded) {
    setValues({
      name: '',
      muscleGroupId: 0,
      weight: 0,
    });
    exercisesStore!.clearState();
    setShowSnackbar(true);
  }

  if (exercisesStore!.isUpdated) {
    exercisesStore!.clearState();
    handleEditSuccess!();
  }

  return (
    <>
      {muscleGroupsStore!.isLoading ? <Spinner /> :
        <Grid container className={classes.mainGrid}>
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
              <InputLabel htmlFor="muscleGroup">Группа мышц</InputLabel>
              <Select
                id="muscleGroup"
                value={values.muscleGroupId}
                onChange={handleChange('muscleGroupId')}
              >
                {muscleGroupsStore!.muscleGroups.map((item: IMuscleGroup) => {
                  return <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                })}
              </Select>
            </FormControl>
            <TextField
              id="weight"
              type="number"
              label="Вес"
              className={classes.textField}
              value={values.weight}
              onChange={handleChange('weight')}
              margin="normal"
              variant="outlined"
            />
            {exercisesStore!.isLoading ? <Spinner /> :
              <Button
                variant="contained"
                color="primary"
                className={classes.submitBtn}
                onClick={submitForm}
              >
                {editedExercise ? 'Сохранить' : 'Добавить'}
              </Button>
            }
          </form>
        </Grid>
      }
      <Snackbar showSnackbar={showSnackbar} message='Упражнение добавлено' />
    </>
  );
}));

export default ExerciseForm;
