import React, { FC, useEffect } from 'react';
import { inject, observer } from 'mobx-react';

import { Button, Card, Divider, Grid, Header, List, } from 'semantic-ui-react';

import Spinner from '../shared/Spinner/Spinner';
import { IWeekSchedule } from '../models/week-schedule.interface';
import { IExercise } from '../models/exercise.interface';
import { IMuscleGroup } from '../models/muscle-group.interface';
import { exportData, getRandomSchedule } from '../shared/utils';


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

const styles = {
  mainGrid: {
    padding: '3em',
  },
  scheduleBtn: {
    marginLeft: '5em',
  },
  scheduleCard: {
    margin: '3em',
    padding: '2em'
  },
  listItem: {
    lineHeight: 1.5
  }
};

const ExerciseList: FC<IProps> = inject('exercisesStore', 'muscleGroupsStore', 'weekScheduleStore')(
  observer(({ exercisesStore, muscleGroupsStore, weekScheduleStore }) => {

  useEffect(() => {
    weekScheduleStore.getWeekSchedule();
    exercisesStore.getExercises();
    muscleGroupsStore.getMuscleGroups();
  }, []);

  const generateSchedule = () => {
    const generatedSchedule: IWeekSchedule = getRandomSchedule(exercisesStore.exercises, muscleGroupsStore.muscleGroups);
    weekScheduleStore.updateWeekSchedule(generatedSchedule);
  };

  const exportSchedule = () => {
    exportData(weekScheduleStore.weekSchedule);
  };

  return (
    <>
      {(weekScheduleStore.isLoading || exercisesStore.isLoading || muscleGroupsStore.isLoading) ? <Spinner />
        : (
          <Grid style={styles.mainGrid}>
            <Grid.Row>
              <Header as="h1">
                Расписание
              </Header>
              <Button
                primary
                style={styles.scheduleBtn}
                onClick={generateSchedule}
              >
                Сгенерировать расписание
              </Button>
              <Button
                secondary
                style={styles.scheduleBtn}
                onClick={exportSchedule}
              >
                Экспортировать в excel
              </Button>
            </Grid.Row>
            <Divider />
            <Grid.Row columns={3}>
              <Grid.Column >
                <Card style={styles.scheduleCard}>
                  <Card.Content header='Понедельник' />
                  <List as='ol'>
                    {weekScheduleStore.weekSchedule.firstDay.map((item: string) => {
                      return (
                        <List.Item as='li' key={item}>
                          <span style={styles.listItem}>{item}</span>
                        </List.Item>
                      )
                    })}
                  </List>
                </Card>
              </Grid.Column>
              <Grid.Column >
                <Card style={styles.scheduleCard}>
                  <Card.Content header='Среда' />
                  <List as='ol'>
                    {weekScheduleStore.weekSchedule.secondDay.map((item: string) => {
                      return (
                        <List.Item as='li' key={item}>
                          <span style={styles.listItem}>{item}</span>
                        </List.Item>
                      )
                    })}
                  </List>
                </Card>
              </Grid.Column>
              <Grid.Column >
                <Card style={styles.scheduleCard}>
                  <Card.Content header='Пятница' />
                  <List as='ol'>
                    {weekScheduleStore.weekSchedule.thirdDay.map((item: string) => {
                      return (
                        <List.Item as='li' key={item}>
                          <span style={styles.listItem}>{item}</span>
                        </List.Item>
                      )
                    })}
                  </List>
                </Card>
              </Grid.Column>

            </Grid.Row>
          </Grid>
        )
      }
    </>
  );
}));

export default ExerciseList;
