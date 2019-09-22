import React, { FC, useEffect } from 'react';
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

import Spinner from '../shared/Spinner/Spinner';
import { IWeekSchedule } from '../models/week-schedule.interface';
import { IExercise } from '../models/exercise.interface';
import { IMuscleGroup } from '../models/muscle-group.interface';
import { getRandomSchedule } from '../shared/utils';


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
  }
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
}));

const ExerciseList: FC<IProps> = inject('exercisesStore', 'muscleGroupsStore', 'weekScheduleStore')(
  observer(({ exercisesStore, muscleGroupsStore, weekScheduleStore }) => {

  const classes = useStyles();

  useEffect(() => {
    weekScheduleStore.getWeekSchedule();
    exercisesStore.getExercises();
    muscleGroupsStore.getMuscleGroups();
  }, []);

  const generateSchedule = () => {
    const generatedSchedule: IWeekSchedule = getRandomSchedule(exercisesStore.exercises, muscleGroupsStore.muscleGroups);
    weekScheduleStore.updateWeekSchedule(generatedSchedule);
  };

  return (
    <>
      {(weekScheduleStore.isLoading || exercisesStore.isLoading || muscleGroupsStore.isLoading) ? <Spinner />
        : (
          <Grid container className={classes.mainGrid}>
            <Typography variant="h5" gutterBottom className={classes.title}>
              Расписание
            </Typography>
            <Button
              variant="contained"
              color="primary"
              className={classes.scheduleBtn}
              //onClick={generateSchedule}
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
              <Grid component="div" item xs={4}>
                <Card className={classes.scheduleCard}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
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
                    <Typography variant="h6" gutterBottom>
                      Понедельник
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
        )
      }
    </>
  );
}));

export default ExerciseList;
