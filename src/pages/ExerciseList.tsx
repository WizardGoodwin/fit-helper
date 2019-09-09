import React, { FC, useEffect, useState } from 'react';
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
} from '../store/actions/exerciseActions';
import { IExercise } from '../models/exercise.interface';
import Spinner from '../shared/Spinner/Spinner';
import { IState } from '../store/reducers';



interface IProps {
  getExercises: () => Promise<IGetExercisesSuccess | IGetExercisesFail>;
  exercises: IExercise[];
  loading: boolean;
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

const muscleGroupList = ['Грудь', 'Спина', 'Плечи', 'Пресс', 'Бицепс', 'Трицепс'];

const ExerciseList: FC<IProps> = ({ exercises, loading, getExercises }) => {
  const classes = useStyles();

  const [expanded, setExpanded] = useState<string | false>('');

  useEffect(() => {
    getExercises();
  }, []);

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      {loading && <Spinner />}
      <Grid container className={classes.mainGrid}>
        <Typography variant="h5" gutterBottom>
          Список упражнений
        </Typography>
        <Divider />
        {muscleGroupList.map((group: string) => {
          return (
            <ExpansionPanel
              square expanded={expanded === group}
              onChange={handleChange(group)} key={group}
            >
              <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography>{group}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List>
                  {exercises.filter((item: IExercise) => item.muscleGroup === group)
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
        })}
      </Grid>
    </>
  );
};

const mapStateToProps = ({ exerciseState }: IState) => {
  return {
    exercises: exerciseState.exercises,
    peopleLoading: exerciseState.loading
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getExercises: () => dispatch(getExercises()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExerciseList);
