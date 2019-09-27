import React, { Fragment, FC, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import { Accordion, Button, Grid, Header, Icon, Modal } from 'semantic-ui-react';

import { IExercise } from '../models/exercise.interface';
import { IMuscleGroup } from '../models/muscle-group.interface';
import Spinner from '../shared/Spinner/Spinner';
import ExerciseForm from '../components/ExerciseForm/ExerciseForm';


interface IProps {
  exercisesStore: {
    exercises: IExercise[];
    isLoading: boolean;
    isDeleted: boolean;
    getExercises: () => any;
    deleteExercise: (id?: number) => any;
    clearState: () => any;
  },
  muscleGroupsStore: {
    muscleGroups: IMuscleGroup[];
    isLoading: boolean;
    getMuscleGroups: () => any;
  }
}

const styles = {
  mainGrid: {
    padding: '3em',
  },
  exerciseList: {
    width: '100%',
  },
  accordion: {
    width: '100%',
  },
  exerciseItem: {
    padding: 0
  }
};

const ExerciseList: FC<IProps> = inject('exercisesStore', 'muscleGroupsStore')(
  observer(({ exercisesStore, muscleGroupsStore }) => {

  const [activeIndex, setActiveIndex] = useState<number | false>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<IExercise | undefined>(undefined);


  useEffect(() => {
    exercisesStore.getExercises();
    muscleGroupsStore.getMuscleGroups();
  }, []);

  const handleAccordionClick = (e: React.SyntheticEvent<HTMLElement>, titleProps: any) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const handleEdit = (exercise: IExercise) => {
    setSelectedExercise(exercise);
    setEditModalOpen(true);
  };

  const handleDelete = (exercise: IExercise) => {
    setSelectedExercise(exercise);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedExercise) {
      exercisesStore.deleteExercise(selectedExercise.id);
    }
  };

  if (exercisesStore.isDeleted) {
    setDeleteModalOpen(false);
    exercisesStore.clearState();
  }

  return (
    <Grid style={styles.mainGrid}>
      <Grid.Row>
        <Header as="h1">Список упражнений</Header>
      </Grid.Row>
      <Grid.Row>
        {(exercisesStore.isLoading || muscleGroupsStore.isLoading) && <Spinner />}
        <Accordion styled style={styles.accordion} >
          {muscleGroupsStore.muscleGroups.map((group: IMuscleGroup) => {
            return (
              <Fragment key={group.id}>
                <Accordion.Title
                  active={activeIndex === group.id}
                  index={group.id}
                  onClick={handleAccordionClick}
                >
                  <Icon name='dropdown' />
                  {group.name}
                </Accordion.Title>
                <Accordion.Content active={activeIndex === group.id}>
                  <Grid style={styles.exerciseList}>
                    {exercisesStore.exercises.filter((item: IExercise) => item.muscleGroupId === group.id)
                      .map((item: IExercise) => {
                        return (
                          <Grid.Row key={item.id} style={styles.exerciseItem}>
                            <Grid columns={4}>
                              <Grid.Column>
                                <span>{item.name}</span>
                              </Grid.Column>
                              <Grid.Column>
                                <span>{item.weight} кг</span>
                              </Grid.Column>
                              <Grid.Column>
                                <Button primary onClick={() => handleEdit(item)}>
                                  Редактировать
                                </Button>
                              </Grid.Column>
                              <Grid.Column>
                                <Button secondary onClick={() => handleDelete(item)}>
                                  Удалить
                                </Button>
                              </Grid.Column>
                            </Grid>
                          </Grid.Row>
                        )
                      })
                    }
                  </Grid>
                </Accordion.Content>
              </Fragment>
            )
          })}
        </Accordion>
      </Grid.Row>

      <Modal size="tiny" open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Modal.Header>Редактировать упражнение</Modal.Header>
        <Modal.Content>
          <ExerciseForm editedExercise={selectedExercise} setModalOpen={setEditModalOpen}/>
        </Modal.Content>
      </Modal>

      <Modal size="mini" open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <Modal.Header>Удалить упражнение</Modal.Header>
        <Modal.Content>
          <p>{`Вы действительно хотите удалить упражнение "${selectedExercise && selectedExercise.name}" ?`}</p>
        </Modal.Content>
        <Modal.Actions>
          <Button positive onClick={handleDeleteConfirm}>Да</Button>
          <Button negative onClick={() => setDeleteModalOpen(false)}>Нет</Button>
        </Modal.Actions>
      </Modal>
    </Grid>
  );
}));

export default ExerciseList;
