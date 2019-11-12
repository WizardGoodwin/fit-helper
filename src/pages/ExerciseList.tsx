import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import {
  Backdrop,
  Button,
  Divider, Fade, Grid, List, ListItem,
  makeStyles, Modal, Theme, Typography, withStyles,
} from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

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

const useStyles = makeStyles((theme: Theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  exerciseList: {
    width: '100%',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInner: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(5),
  },
  deleteText: {
    margin: theme.spacing(3, 0)
  },
  mainExercise: {
    maxWidth: 100,
    textAlign: 'center',
    borderRadius: 5,
    color: '#fff',
    backgroundColor: theme.palette.primary.main,
  },
  additionalExercise: {
    maxWidth: 150,
    textAlign: 'center',
    borderRadius: 5,
    color: '#fff',
    backgroundColor: theme.palette.secondary.main,
  }
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


const ExerciseList: FC<IProps> = inject('exercisesStore', 'muscleGroupsStore')(
  observer(({ exercisesStore, muscleGroupsStore }) => {

  const classes = useStyles();

  const [expanded, setExpanded] = useState<number | false>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<IExercise | undefined>(undefined);


  useEffect(() => {
    exercisesStore.getExercises();
    muscleGroupsStore.getMuscleGroups();
  }, []);

  const handleChange = (id: number) => (event: ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? id : false);
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
    <>
      {(exercisesStore.isLoading || muscleGroupsStore.isLoading) && <Spinner />}
      <Grid container className={classes.mainGrid}>
        <Typography variant="h5" gutterBottom>
          Список упражнений
        </Typography>
        <Divider />
        {muscleGroupsStore.muscleGroups.map((group: IMuscleGroup) => {
          return (
            <ExpansionPanel
              square expanded={expanded === group.id}
              onChange={handleChange(group.id)} key={group.id}
            >
              <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>{group.name}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List className={classes.exerciseList}>
                  {exercisesStore.exercises.filter((item: IExercise) => item.muscleGroupId === group.id)
                    .map((item: IExercise) => {
                      return (
                        <ListItem key={item.id}>
                          <Grid container>
                            <Grid item xs={3}>
                              <Typography>{item.name}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                              {item.isMain ? (
                                <Typography className={classes.mainExercise}>Основное</Typography>
                              ) : (
                                <Typography className={classes.additionalExercise}>Вспомогательное</Typography>
                              )}
                            </Grid>
                            <Grid item xs={3}>
                              <Typography>{item.weight} кг</Typography>
                            </Grid>
                            <Grid container item xs={3} justify="space-between">
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleEdit(item)}
                               >
                                Редактировать
                              </Button>
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => handleDelete(item)}
                              >
                                Удалить
                              </Button>
                            </Grid>
                          </Grid>
                        </ListItem>
                      )
                    })
                  }
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          )
        })}
      </Grid>
      <Modal
        className={classes.modal}
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={editModalOpen}>
          <div className={classes.modalInner}>
            <Typography variant="h5" gutterBottom>
              Редактировать упражнение
            </Typography>
            <ExerciseForm editedExercise={selectedExercise} setModalOpen={setEditModalOpen}/>
          </div>
        </Fade>
      </Modal>

      <Modal
        className={classes.modal}
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={deleteModalOpen}>
          <div className={classes.modalInner}>
            <Typography variant="h5" gutterBottom>
              Удалить упражнение
            </Typography>
            <Typography className={classes.deleteText}>
              {`Вы действительно хотите удалить упражнение "${selectedExercise && selectedExercise.name}" ?`}
            </Typography>
            <Grid container justify="space-around">
              <Button
                variant="contained"
                color="primary"
                onClick={handleDeleteConfirm}
              >
                Да
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setDeleteModalOpen(false)}
              >
                Нет
              </Button>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </>
  );
}));

export default ExerciseList;
