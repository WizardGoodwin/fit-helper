import React from 'react';
import { Link } from 'react-router-dom';

import { Header as SemanticHeader, Menu } from 'semantic-ui-react';

const styles = {
  menu: {
    backgroundColor: '#2185d0',
  },
  menuHeader: {
    color: '#fff'
  },
  menuLink: {
    color: '#fff'
  }
};

const Header = () => {
  return (
    <Menu pointing style={styles.menu}>
      <Menu.Item >
        <SemanticHeader as='h2' style={styles.menuHeader}>Fit Helper</SemanticHeader>
      </Menu.Item>
      <Menu.Item>
        <Link to='/' style={styles.menuLink}>Расписание</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/exercises' style={styles.menuLink}>Список упражений</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to='/exercises/new' style={styles.menuLink}>Добавить упражнение</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
