import React, { FC } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';

import { AppBar, Toolbar, Link, makeStyles, Typography, Button } from '@material-ui/core';

import { clearCookies, isUserLoggedIn } from '../../shared/utils/cookie';

interface IProps {
  history: any;
}


const useStyles = makeStyles(theme => ({
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  toolbarTitle: {
    marginRight: theme.spacing(3),
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  mainNav: {
    display: 'flex',
    alignItems: 'baseline'
  },
  logoutBtn: {
    color: '#fff'
  }
}));

const Header: FC<IProps> = ({ history }) => {
  const classes = useStyles();

  const handleLogout = () => {
    clearCookies();
    history.push('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <nav className={classes.mainNav}>
          <Typography
            component="h2"
            variant="h5"
            color="inherit"
            align="center"
            className={classes.toolbarTitle}
          >
            Fit Helper
          </Typography>
          <Link component={RouterLink} to="/" color="inherit" variant="button" className={classes.toolbarLink}>
            Расписание
          </Link>
          <Link component={RouterLink} to="/exercises" color="inherit" variant="button" className={classes.toolbarLink}>
            Список упражнений
          </Link>
          <Link component={RouterLink} to="/exercises/add" color="inherit" variant="button" className={classes.toolbarLink}>
            Добавить упражнение
          </Link>
        </nav>
        <nav>
          {isUserLoggedIn() ? (
            <Button
              variant="text"
              className={classes.logoutBtn}
              onClick={handleLogout}
            >
              Выйти
            </Button>
          ) : (
            <>
              <Link component={RouterLink} to="/registration" color="inherit" variant="button" className={classes.toolbarLink}>
                Регистрация
              </Link>
              <Link component={RouterLink} to="/login" color="inherit" variant="button" className={classes.toolbarLink}>
                Вход
              </Link>
            </>
          )}
        </nav>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
