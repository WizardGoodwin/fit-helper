import React, { Component } from 'react';
import axios from '../../utils/axios';
import { IReactComponent } from 'mobx-react/dist/types/IReactComponent';

import ErrorIndicator from '../../components/shared/ErrorIndicator';

const withErrorHandler = (WrappedComponent: IReactComponent) => {
  return class extends Component {
    state = {
      hasError: false,
    };

    // handling 401 error with axios interceptors
    componentDidMount() {
      axios.interceptors.response.use(
        (res) => res,
        (error) => {
          if (error.response.status === 401) {
            (window as any).location = '/sign-in';
          } else {
            throw error;
          }
        },
      );
    }

    componentDidCatch() {
      this.setState({ hasError: true });
    }

    render() {
      if (this.state.hasError) {
        return <ErrorIndicator />;
      }
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default withErrorHandler;
