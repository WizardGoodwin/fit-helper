import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';

import {
  Divider, Grid, List, ListItem,
  makeStyles, Theme, Typography, withStyles
} from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import {
  getExercises,
  IGetExercisesFail,
  IGetExercisesSuccess
} from '../store/actions/exercise-actions';
import { IExercise } from '../models/exercise.interface';
import Spinner from '../shared/Spinner/Spinner';
import { IAppState } from '../store/reducers';
import {
  getMuscleGroups,
  IGetMuscleGroupsFail,
  IGetMuscleGroupsSuccess
} from '../store/actions/muscle-group-actions';
import { IMuscleGroup } from '../models/muscle-group.interface';


interface IProps {
  exercises: IExercise[];
  muscleGroups: IMuscleGroup[];
  exercisesLoading: boolean;
  muscleGroupsLoading: boolean;
  getExercises: () => Promise<IGetExercisesSuccess | IGetExercisesFail>;
  getMuscleGroups: () => Promise<IGetMuscleGroupsSuccess | IGetMuscleGroupsFail>;
}

const useStyles = makeStyles((theme: Theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const ExpansionPanel = withStyles({
  root: {
    width: '100%',
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

const ExerciseList: FC<IProps> = (
  { exercises, muscleGroups, exercisesLoading, muscleGroupsLoading, getExercises, getMuscleGroups}
  ) => {

  const classes = useStyles();

  const [expanded, setExpanded] = useState<number | false>(false);

  useEffect(() => {
    getExercises();
    getMuscleGroups();
  }, []);

  const handleChange = (id: number) => (event: ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? id : false);
  };

  return (
    <>
      {(exercisesLoading || muscleGroupsLoading) && <Spinner />}
      <Grid container className={classes.mainGrid}>
        <Typography variant="h5" gutterBottom>
          Список упражнений
        </Typography>
        <Divider />
        {muscleGroups.map((group: IMuscleGroup) => {
          if (group && group.id) {
            return (
              <ExpansionPanel
                square expanded={expanded === group.id}
                onChange={handleChange(group.id)} key={group.id}
              >
                <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                  <Typography>{group.name}</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <List>
                    {exercises.filter((item: IExercise) => item.muscleGroupId === group.id)
                      .map((item: IExercise) => {
                        return (
                          <ListItem key={item.id}>
                            {item.name}
                          </ListItem>
                        )
                      })
                    }
                  </List>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
          }
        })}
      </Grid>
    </>
  );
};

const mapStateToProps = ({ exerciseState, muscleGroupState }: IAppState) => {
  return {
    exercises: exerciseState.exercises,
    exercisesLoading: exerciseState.loading,
    muscleGroups: muscleGroupState.muscleGroups,
    muscleGroupsLoading: muscleGroupState.loading,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getExercises: () => dispatch(getExercises()),
    getMuscleGroups: () => dispatch(getMuscleGroups()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExerciseList);
