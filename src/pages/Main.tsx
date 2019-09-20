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
  exercises: IExercise[];
  muscleGroups: IMuscleGroup[];
  weekSchedule: IWeekSchedule;
  isWeekScheduleLoading: boolean;
  getExercises: () => Promise<any>;
  getMuscleGroups: () => Promise<any>;
  getWeekSchedule: () => Promise<any>;
  updateWeekSchedule: (weekSchedule: IWeekSchedule) => Promise<any>;
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
  observer((props) => {
    const {
      exercises,
      muscleGroups,
      weekSchedule,
      isWeekScheduleLoading,
      getExercises,
      getMuscleGroups,
      getWeekSchedule,
      updateWeekSchedule
    } = props;
    console.log(props);

  const classes = useStyles();

  useEffect(() => {
    getExercises();
    getMuscleGroups();
    getWeekSchedule();
  }, []);

  const generateSchedule = () => {
    const generatedSchedule: IWeekSchedule = getRandomSchedule(exercises, muscleGroups);
    updateWeekSchedule(generatedSchedule);
  };

  return (
    <>
      {isWeekScheduleLoading && <Spinner />}
      <Grid container className={classes.mainGrid}>
        <Typography variant="h5" gutterBottom className={classes.title}>
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
}));

export default ExerciseList;
