import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { createStyles, Grid, makeStyles, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: '30vh'
    },
    text: {
      marginTop: theme.spacing(3)
    }
  }),
);

const ErrorIndicator: FC = () => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.container}
    >
      <Typography variant="h2">Похоже, что-то пошло не так</Typography>
      <Typography variant="body1" className={classes.text}>
        Попробуйте перезагрузить страницу или вернуться на главную
      </Typography>
      <Link to="/">
        <Typography variant="body1" className={classes.text}>Перейти на главную</Typography>
      </Link>
    </Grid>
  );
};

export default ErrorIndicator;
