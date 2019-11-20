import React, { FC } from 'react';

import Header from './Header';

interface IProps {
  children: any;
}

const Layout: FC<IProps> = (props) => {
  return (
    <>
      <Header />
      <main>
        {props.children}
      </main>
    </>
  );
};

export default Layout;
