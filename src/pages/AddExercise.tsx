import React, { FC } from 'react';


import ExerciseForm from '../components/ExerciseForm/ExerciseForm';
import { Divider, Grid, Header } from 'semantic-ui-react';

const styles = {
  mainGrid: {
    padding: '3em',
    display: 'flex',
    flexDirection: 'column'
  },
};

const AddExercise: FC = () => {

  return (
    <>
      <Grid style={styles.mainGrid}>
        <Header as="h1">
          Добавить упражнение
        </Header>
        <Divider />
        <ExerciseForm />
      </Grid>
    </>

  );
};

export default AddExercise;
