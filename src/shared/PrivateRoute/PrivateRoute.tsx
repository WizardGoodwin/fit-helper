import React, { FC } from 'react';
import { isUserLoggedIn } from '../utils/cookie';
import { Redirect, Route } from 'react-router';

interface IProps {
  path: string;
  exact?: boolean;
  component: any;
}

const PrivateRoute: FC<IProps> = ({component: Component, ...rest}) => {
  return isUserLoggedIn() ? (
    <Route
      {...rest}
      render={(matchProps) => (
          <Component {...matchProps} />
      )}
    />
  ) : (
    <Redirect to='/login' />
  )
};

export default PrivateRoute;
