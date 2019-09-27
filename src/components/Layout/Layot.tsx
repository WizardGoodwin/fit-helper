import React, { FC, Fragment } from 'react';

import Header from '../Header/Header';

interface IProps {
  children: any;
}

const Layout: FC<IProps> = (props) => {
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
