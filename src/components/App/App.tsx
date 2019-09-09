import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from '../../shared/NotFound/NotFound';
import Layout from '../Layout/Layot';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Main from '../../pages/Main';
import ExerciseList from '../../pages/ExerciseList';
import AddExercise from '../../pages/AddExercise';
import EditExercise from '../../pages/EditExercise';

const App = () => {

  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/exercises" exact component={ExerciseList} />
        <Route path="/exercises/add" component={AddExercise} />
        <Route path="/exercises/:id" component={EditExercise} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default withErrorHandler(App);
