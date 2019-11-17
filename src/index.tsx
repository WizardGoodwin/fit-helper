import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { ThemeProvider } from '@material-ui/styles';

import exercisesStore from './stores/exercisesStore';
import muscleGroupsStore from './stores/muscleGroupsStore';
import weekScheduleStore from './stores/weekScheduleStore';
import userStore from './stores/userStore';
import theme from './theme';
import App from './components/App/App';

const stores = {
  exercisesStore,
  muscleGroupsStore,
  weekScheduleStore,
  userStore
};

ReactDOM.render(
  <Provider {...stores}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
