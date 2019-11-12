import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from '../../shared/NotFound/NotFound';
import Layout from '../Layout/Layot';
import Main from '../../pages/Main';
import ExerciseList from '../../pages/ExerciseList';
import AddExercise from '../../pages/AddExercise';
import Registration from '../../pages/Registration';


const App = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/exercises" exact component={ExerciseList} />
        <Route path="/exercises/add" component={AddExercise} />
        <Route path="/registration" component={Registration} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default App;
