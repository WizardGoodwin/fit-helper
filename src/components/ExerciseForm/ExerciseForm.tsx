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
  Button,
} from '@material-ui/core';

import { IAppState } from '../../store/reducers';
import { addExercise, IAddExerciseFail, IAddExerciseSuccess, } from '../../store/actions/exercise-actions';
import { getMuscleGroups, IGetMuscleGroupsFail, IGetMuscleGroupsSuccess } from '../../store/actions/muscle-group-actions';
import { IMuscleGroup } from '../../models/muscle-group.interface';
import Spinner from '../../shared/Spinner/Spinner';
import { IExercise } from '../../models/exercise.interface';
import { IUpdateExerciseFail, IUpdateExerciseSuccess, updateExercise } from '../../store/actions/exercise-actions';


interface IState {
  name: string;
  muscleGroupId: number;
  weight: number;
}

interface IProps {
  muscleGroups: IMuscleGroup[];
  exerciseLoading: boolean;
  muscleGroupsLoading: boolean;
  editedExercise?: IExercise;
  setModalOpen?: (value: boolean) => void;
  addExercise: (exercise: IExercise) => Promise<IAddExerciseSuccess | IAddExerciseFail>;
  updateExercise: (exercise: IExercise) => Promise<IUpdateExerciseSuccess | IUpdateExerciseFail>;
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

const ExerciseForm: FC<IProps> = ({
  editedExercise,
  muscleGroups,
  exerciseLoading,
  setModalOpen,
  muscleGroupsLoading,
  getMuscleGroups,
  addExercise,
  updateExercise
}) => {
  const classes = useStyles();

  const initialState: IState = editedExercise ? editedExercise : {
    name: '',
    muscleGroupId: 0,
    weight: 0
  };

  const [values, setValues] = useState<IState>(initialState);

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
    if (editedExercise) {
      updateExercise(values).then(() => {
        if (setModalOpen) setModalOpen(false);
      });
    } else {
      addExercise(values).then(() => {
        setValues({
          name: '',
          muscleGroupId: 0,
          weight: 0
        })
      });
    }
  };

  return (
    <>
      {muscleGroupsLoading ? <Spinner /> :
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
            {exerciseLoading ? <Spinner /> :
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
    </>

  );
};

const mapStateToProps = ({ exerciseState, muscleGroupState }: IAppState) => {
  return {
    exerciseLoading: exerciseState.loading,
    muscleGroups: muscleGroupState.muscleGroups,
    muscleGroupsLoading: muscleGroupState.loading,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    addExercise: (exercise: IExercise) => dispatch(addExercise(exercise)),
    updateExercise: (exercise: IExercise) => dispatch(updateExercise(exercise)),
    getMuscleGroups: () => dispatch(getMuscleGroups()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExerciseForm);
