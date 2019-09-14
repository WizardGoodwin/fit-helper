import React, { FC } from 'react';

import { createStyles, Divider, Grid, makeStyles, Theme, Typography, } from '@material-ui/core';

import ExerciseForm from '../components/ExerciseForm/ExerciseForm';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    mainGrid: {
      marginTop: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column'
    }
  }),
);

const AddExercise: FC = () => {
  const classes = useStyles();

  return (
    <>
        <Grid container className={classes.mainGrid}>
          <Typography variant="h5" gutterBottom>
            Добавить упражнение
          </Typography>
          <Divider />
          <ExerciseForm />
        </Grid>
    </>

  );
};

export default AddExercise;
