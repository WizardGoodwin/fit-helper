import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

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

import { IAppState } from '../store/reducers';
import { addExercise, IAddExerciseFail, IAddExerciseSuccess, } from '../store/actions/exercise-actions';
import { getMuscleGroups, IGetMuscleGroupsFail, IGetMuscleGroupsSuccess } from '../store/actions/muscle-group-actions';
import { IMuscleGroup } from '../models/muscle-group.interface';
import Spinner from '../shared/Spinner/Spinner';
import { IExercise } from '../models/exercise.interface';


interface IState {
  name: string;
  muscleGroupId: number;
}

interface IProps {
  muscleGroups: IMuscleGroup[];
  exerciseAdding: boolean;
  muscleGroupsLoading: boolean;
  addExercise: (exercise: IExercise) => Promise<IAddExerciseSuccess | IAddExerciseFail>;
  getMuscleGroups: () => Promise<IGetMuscleGroupsSuccess | IGetMuscleGroupsFail>;
}

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

const AddExercise: FC<IProps> = (
  { muscleGroups, exerciseAdding, muscleGroupsLoading, getMuscleGroups, addExercise }
) => {
  const classes = useStyles();

  const [values, setValues] = useState<IState>({
    name: '',
    muscleGroupId: 0
  });

  useEffect(() => {
    getMuscleGroups();
  }, []);

  const handleChange = (name: keyof typeof values) => (event: ChangeEvent<HTMLInputElement | { name?: string, value: unknown }>) => {
    setValues({
      ...values,
      [name]: event.target.value
    });
  };

  const submitForm = () => {
    addExercise(values);
    setValues({
      name: '',
      muscleGroupId: 0
    })
  };

  return (
    <>
      {muscleGroupsLoading ? <Spinner /> :
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
                value={values.muscleGroupId}
                onChange={handleChange('muscleGroupId')}
              >
                {muscleGroups.map((item: IMuscleGroup) => {
                  return <MenuItem value={item.id} key={item.id}>{item.name}</MenuItem>
                })}
              </Select>
              {exerciseAdding ? <Spinner /> :
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.submitBtn}
                  onClick={submitForm}
                >
                  Добавить
                </Button>
              }
            </FormControl>
          </form>
        </Grid>
      }
    </>

  );
};

const mapStateToProps = ({ exerciseState, muscleGroupState }: IAppState) => {
  return {
    exerciseAdding: exerciseState.loading,
    muscleGroups: muscleGroupState.muscleGroups,
    muscleGroupsLoading: muscleGroupState.loading,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    addExercise: (exercise: IExercise) => dispatch(addExercise(exercise)),
    getMuscleGroups: () => dispatch(getMuscleGroups()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddExercise);
