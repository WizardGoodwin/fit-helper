import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';

import {
  Backdrop,
  Button,
  Divider, Fade, Grid, List, ListItem,
  makeStyles, Modal, Theme, Typography, withStyles,
} from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';

import {
  deleteExercise,
  getExercises, IDeleteExerciseFail, IDeleteExerciseSuccess,
  IGetExercisesFail,
  IGetExercisesSuccess,
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
import ExerciseForm from '../components/ExerciseForm/ExerciseForm';


interface IProps {
  exercises: IExercise[];
  muscleGroups: IMuscleGroup[];
  exercisesLoading: boolean;
  muscleGroupsLoading: boolean;
  getExercises: () => Promise<IGetExercisesSuccess | IGetExercisesFail>;
  getMuscleGroups: () => Promise<IGetMuscleGroupsSuccess | IGetMuscleGroupsFail>;
  deleteExercise: (id?: number) => Promise<IDeleteExerciseSuccess | IDeleteExerciseFail>;
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

const ExerciseList: FC<IProps> = ({
  exercises,
  muscleGroups,
  exercisesLoading,
  muscleGroupsLoading,
  getExercises,
  getMuscleGroups,
  deleteExercise
}) => {

  const classes = useStyles();

  const [expanded, setExpanded] = useState<number | false>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [selectedExercise, setSelectedExercise] = useState<IExercise | undefined>(undefined);


  useEffect(() => {
    getExercises();
    getMuscleGroups();
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
      deleteExercise(selectedExercise.id).then(() => setDeleteModalOpen(false));
    }
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
                  {exercises.filter((item: IExercise) => item.muscleGroupId === group.id)
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
                            <Grid container item xs={4} justify="space-between">
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
    deleteExercise: (id?: number) => dispatch((deleteExercise(id)))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExerciseList);
