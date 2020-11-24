import React, { FC, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

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
} from '@material-ui/core';

import Spinner from '../shared/Spinner';
import { IWeekSchedule } from '../../models/week-schedule.interface';
import { IExercise } from '../../models/exercise.interface';
import { IMuscleGroup } from '../../models/muscle-group.interface';
import { exportData, getRandomSchedule } from '../../utils/misc';
import Snackbar from '../shared/Snackbar';

interface IProps {
  exercisesStore: {
    exercises: IExercise[];
    isLoading: boolean;
    getExercises: () => any;
  },
  muscleGroupsStore: {
    muscleGroups: IMuscleGroup[];
    isLoading: boolean;
    getMuscleGroups: () => any;
  },
  weekScheduleStore: {
    weekSchedule: IWeekSchedule;
    isLoading: boolean;
    getWeekSchedule: () => any;
    updateWeekSchedule: (weekSchedule: IWeekSchedule) => any;
  },
  location: {
    state: {
      message?: string
    }
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  scheduleBtn: {
    marginLeft: theme.spacing(5),
  },
  scheduleCard: {
    margin: theme.spacing(3),
  },
  title: {
    marginLeft: theme.spacing(3),
  },
  cardTitle: {
    marginBottom: theme.spacing(3),
  }
}));

const ExerciseList: FC<IProps> = inject('exercisesStore', 'muscleGroupsStore', 'weekScheduleStore')(
  observer(({ exercisesStore, muscleGroupsStore, weekScheduleStore, location }) => {

  const classes = useStyles();
  const locationState = location.state || {};

  const [showSnackbar, setShowSnackbar] = useState(false);

  useEffect(() => {
    if (locationState.message) setShowSnackbar(true);
  }, [locationState.message]);

  useEffect(() => {
      muscleGroupsStore.getMuscleGroups();
      exercisesStore.getExercises();
      weekScheduleStore.getWeekSchedule();
  }, [exercisesStore, muscleGroupsStore, weekScheduleStore]);

  const generateSchedule = () => {
    const generatedSchedule: IWeekSchedule = getRandomSchedule(exercisesStore.exercises, muscleGroupsStore.muscleGroups);
    weekScheduleStore.updateWeekSchedule(generatedSchedule);
  };

  const exportSchedule = () => {
    exportData(weekScheduleStore.weekSchedule);
  };

  return (
    <>
      {(weekScheduleStore.isLoading || exercisesStore.isLoading || muscleGroupsStore.isLoading) && <Spinner />}
      <Grid container className={classes.mainGrid}>
        <Typography variant="h5" gutterBottom className={classes.title}>
          Расписание
        </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.scheduleBtn}
          onClick={generateSchedule}
        >
          Сгенерировать расписание
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={classes.scheduleBtn}
          onClick={exportSchedule}
        >
          Экспорт в xls
        </Button>
        <Divider />
        <Grid container>
          <Grid item xs={4}>
            <Card className={classes.scheduleCard}>
              <CardContent>
              <Typography variant="h6" gutterBottom className={classes.cardTitle}>
                Понедельник
              </Typography>
              <List>
                {weekScheduleStore.weekSchedule.firstDay.map((item: string) => {
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
                <Typography variant="h6" gutterBottom className={classes.cardTitle}>
                  Среда
                </Typography>
                <List>
                  {weekScheduleStore.weekSchedule.secondDay.map((item: string) => {
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
                <Typography variant="h6" gutterBottom className={classes.cardTitle}>
                  Пятница
                </Typography>
                <List>
                  {weekScheduleStore.weekSchedule.thirdDay.map((item: string) => {
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
      <Snackbar showSnackbar={showSnackbar} message={locationState.message} />
    </>
  );
}));

export default ExerciseList;
