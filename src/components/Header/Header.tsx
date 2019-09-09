import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AppBar, IconButton, Toolbar, Link, makeStyles, Typography } from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
  toolbarTitle: {
    flex: 1,
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  }
}));

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" href="#">
          <MenuIcon />
        </IconButton>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          className={classes.toolbarTitle}
        >
          Fit Helper
        </Typography>
        <nav>
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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
