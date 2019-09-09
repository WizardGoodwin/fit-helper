import React, { Fragment, FunctionComponent } from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface IProps {
  children: any;
}

const Layout: FunctionComponent<IProps> = (props) => {
  return (
    <Fragment>
      <Header />
      <main className="container row mx-auto mb-5">
        <div className="col-lg-9">{props.children}</div>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Layout;