import React, { Fragment, FunctionComponent } from 'react';

import Header from '../Header/Header';

interface IProps {
  children: any;
}

const Layout: FunctionComponent<IProps> = (props) => {
  return (
    <Fragment>
      <Header />
      <main>
        {props.children}
      </main>
    </Fragment>
  );
};

export default Layout;
