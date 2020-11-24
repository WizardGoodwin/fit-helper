import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';

import {
  Accordion as MuiAccordion,
  AccordionSummary as MuiAccordionSummary,
  AccordionDetails as MuiAccordionDetails,
  Backdrop, Button, Divider, Fade, Grid, List, ListItem,
  makeStyles, Modal, Theme, Typography, withStyles,
} from '@material-ui/core';

import { IExercise } from '../../models/exercise.interface';
import { IMuscleGroup } from '../../models/muscle-group.interface';
import Spinner from '../shared/Spinner';
import ExerciseForm from '../shared/ExerciseForm';
import Snackbar from '../shared/Snackbar';


interface IProps {
  exercisesStore: {
    exercises: IExercise[];
    isLoading: boolean;
    isUpdated: boolean;
    isDeleted: boolean;
    getExercises: () => any;
    deleteExercise: (id?: number) => any;
    clearState: () => any;
  },
  muscleGroupsStore: {
    muscleGroups: IMuscleGroup[];
    isLoading: boolean;
    getMuscleGroups: () => any;
  },
  userStore: {
    clearState: () => any;
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
}));

const Accordion = withStyles({
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
})(MuiAccordion);

const AccordionSummary = withStyles({
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
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);


const ExerciseList: FC<IProps> = inject('exercisesStore', 'muscleGroupsStore', 'userStore')(
  observer(({ exercisesStore, muscleGroupsStore, userStore }) => {

  const classes = useStyles();

  const [expanded, setExpanded] = useState<number | false>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<IExercise | undefined>(undefined);
  const [snackbar, setSnackbar] = useState({
    show: false,
    message: ''
  });

  useEffect(() => {
    userStore.clearState();
    exercisesStore.getExercises();
    muscleGroupsStore.getMuscleGroups();
  }, [exercisesStore, muscleGroupsStore, userStore]);

  useEffect(() => {
    if (exercisesStore.isDeleted) {
      setDeleteModalOpen(false);
      exercisesStore.clearState();
      setSnackbar({
        show: true,
        message: 'Упражнение успешно удалено!'
      });
    }
  }, [exercisesStore, exercisesStore.isDeleted]);

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

  const handleEditSuccess = () => {
    setEditModalOpen(false);
    setSnackbar({
      show: true,
      message: 'Упражнение успешно отредактировано!'
    });
  };

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
            <Accordion
              square expanded={expanded === group.id}
              onChange={handleChange(group.id)} key={group.id}
            >
              <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>{group.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List className={classes.exerciseList}>
                  {exercisesStore.exercises.filter((item: IExercise) => item.muscleGroupId === group.id)
                    .map((item: IExercise) => {
                      return (
                        <ListItem key={item.id}>
                          <Grid container>
                            <Grid item xs={4}>
                              <Typography>{item.name}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                              <Typography>{item.weight} кг</Typography>
                            </Grid>
                            <Grid container item xs={2}>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleEdit(item)}
                               >
                                Редактировать
                              </Button>
                            </Grid>
                            <Grid container item xs={2}>
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
              </AccordionDetails>
            </Accordion>
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
            <ExerciseForm editedExercise={selectedExercise} handleEditSuccess={handleEditSuccess}/>
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
      <Snackbar showSnackbar={snackbar.show} message={snackbar.message} />
    </>
  );
}));

export default ExerciseList;
