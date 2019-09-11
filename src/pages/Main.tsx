import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  ListItem,
  makeStyles,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';

import Spinner from '../shared/Spinner/Spinner';
import { IAppState } from '../store/reducers';
import { getExercises, IGetExercisesFail, IGetExercisesSuccess } from '../store/actions/exercise-actions';
import { getMuscleGroups, IGetMuscleGroupsFail, IGetMuscleGroupsSuccess } from '../store/actions/muscle-group-actions';
import {
  getWeekSchedule,
  updateWeekSchedule,
  IGetWeekScheduleFail,
  IGetWeekScheduleSuccess,
  IUpdateWeekScheduleSuccess,
  IUpdateWeekScheduleFail,
} from '../store/actions/week-schedule-actions';
import { IWeekSchedule } from '../models/week-schedule.interface';
import { IExercise } from '../models/exercise.interface';
import { IMuscleGroup } from '../models/muscle-group.interface';
import { getRandomSchedule } from '../shared/utils';


interface IProps {
  exercises: IExercise[];
  muscleGroups: IMuscleGroup[];
  weekSchedule: IWeekSchedule;
  weekScheduleLoading: boolean;
  getExercises: () => Promise<IGetExercisesSuccess | IGetExercisesFail>;
  getMuscleGroups: () => Promise<IGetMuscleGroupsSuccess | IGetMuscleGroupsFail>;
  getWeekSchedule: () => Promise<IGetWeekScheduleSuccess | IGetWeekScheduleFail>;
  updateWeekSchedule: (weekSchedule: IWeekSchedule) => Promise<IUpdateWeekScheduleSuccess | IUpdateWeekScheduleFail>;
}

const useStyles = makeStyles((theme: Theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  scheduleBtn: {
    marginLeft: theme.spacing(5)
  },
  scheduleCard: {
    margin: theme.spacing(3),
  }
}));

const ExerciseList: FC<IProps> = ({
  exercises,
  muscleGroups,
  weekSchedule,
  weekScheduleLoading,
  getExercises,
  getMuscleGroups,
  getWeekSchedule,
  updateWeekSchedule
}) => {

  const classes = useStyles();

  const [expanded, setExpanded] = useState<string | false>(false);

  useEffect(() => {
    getExercises();
    getMuscleGroups();
    getWeekSchedule();
  }, []);

  const handleChange = (title: string) => (event: ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? title : false);
  };

  const generateSchedule = () => {
    const generatedSchedule: IWeekSchedule = getRandomSchedule(exercises, muscleGroups);
    updateWeekSchedule(generatedSchedule);
  };

  return (
    <>
      {weekScheduleLoading && <Spinner />}
      <Grid container className={classes.mainGrid}>
        <Typography variant="h5" gutterBottom>
          Расписание
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.scheduleBtn}
          onClick={() => generateSchedule()}
        >
          Сгенерировать расписание
        </Button>
        <Divider />
        <Grid container>
          <Grid item xs={4}>
            <Card className={classes.scheduleCard}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Понедельник
                </Typography>
                <List>
                  {weekSchedule.firstDay.map((item: string) => {
                    return (
                      <ListItem key={item}>
                        <Typography>{item}</Typography>
                      </ListItem>
                    )
                  })}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid component="div" item xs={4}>
            <Card className={classes.scheduleCard}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Среда
                </Typography>
                <List>
                  {weekSchedule.secondDay.map((item: string) => {
                    return (
                      <ListItem key={item}>
                        <Typography>{item}</Typography>
                      </ListItem>
                    )
                  })}
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.scheduleCard}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Понедельник
                </Typography>
                <List>
                  {weekSchedule.thirdDay.map((item: string) => {
                    return (
                      <ListItem key={item}>
                        <Typography>{item}</Typography>
                      </ListItem>
                    )
                  })}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = ({ exerciseState, muscleGroupState, weekScheduleState }: IAppState) => {
  return {
    exercises: exerciseState.exercises,
    muscleGroups: muscleGroupState.muscleGroups,
    weekSchedule: weekScheduleState.weekSchedule,
    weekScheduleLoading: weekScheduleState.loading,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getExercises: () => dispatch(getExercises()),
    getMuscleGroups: () => dispatch(getMuscleGroups()),
    getWeekSchedule: () => dispatch(getWeekSchedule()),
    updateWeekSchedule: (weekSchedule: IWeekSchedule) => dispatch(updateWeekSchedule(weekSchedule)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExerciseList);
