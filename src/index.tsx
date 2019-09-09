import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';

import theme from './theme';
import App from './components/App/App';
import { store } from './store/store';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
 </Provider>,
  document.getElementById('root'),
);
