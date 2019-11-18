import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFound from '../../shared/NotFound/NotFound';
import Layout from '../Layout/Layot';
import Main from '../../pages/Main';
import ExerciseList from '../../pages/ExerciseList';
import AddExercise from '../../pages/AddExercise';
import Profile from '../../pages/Profile';
import Registration from '../../pages/Registration';
import Login from '../../pages/Login';
import PrivateRoute from '../../shared/PrivateRoute/PrivateRoute';


const App = () => {
  return (
    <Layout>
      <Switch>
        <PrivateRoute path="/" exact component={Main} />
        <PrivateRoute path="/exercises" exact component={ExerciseList} />
        <PrivateRoute path="/exercises/add" component={AddExercise} />
        <PrivateRoute path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
};

export default App;
