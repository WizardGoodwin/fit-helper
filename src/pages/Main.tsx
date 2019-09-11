import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { Button, Divider, Grid, List, ListItem, makeStyles, Theme, Typography, withStyles } from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails/ExpansionPanelDetails';

import Spinner from '../shared/Spinner/Spinner';
import { IAppState } from '../store/reducers';
import { getWeekSchedule } from '../store/actions/week-schedule-actions';
import { IWeekSchedule } from '../models/week-schedule.interface';
import { IGetWeekScheduleFail, IGetWeekScheduleSuccess } from '../store/actions/week-schedule-actions';

interface IProps {
  weekSchedule: IWeekSchedule;
  weekScheduleLoading: boolean;
  getWeekSchedule: () => Promise<IGetWeekScheduleSuccess | IGetWeekScheduleFail>;
}

const useStyles = makeStyles((theme: Theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const ExpansionPanel = withStyles({
  root: {
    width: '100%',
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

const ExerciseList: FC<IProps> = ({ weekSchedule, weekScheduleLoading, getWeekSchedule }) => {

  const classes = useStyles();

  const [expanded, setExpanded] = useState<string | false>(false);

  useEffect(() => {
    getWeekSchedule();
  }, []);

  const handleChange = (title: string) => (event: ChangeEvent<{}>, newExpanded: boolean) => {
    setExpanded(newExpanded ? title : false);
  };

  return (
    <>
      {weekScheduleLoading && <Spinner />}
      <Grid container className={classes.mainGrid}>
        <Typography variant="h5" gutterBottom>
          Расписание
        </Typography>
        <Divider />
        <Grid item xs={8}>
          <ExpansionPanel
            square expanded={expanded === 'firstDay'}
            onChange={handleChange('firstDay')}
          >
            <ExpansionPanelSummary aria-controls="firstDay-content" id="firstDay-header">
              <Typography>Первый день</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <List>
                {weekSchedule.firstDay.map((item: string) => {
                  return (
                    <ListItem key={item}>
                      {item}
                    </ListItem>
                  )
                })
                }
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            square expanded={expanded === 'secondDay'}
            onChange={handleChange('secondDay')}
          >
            <ExpansionPanelSummary aria-controls="secondDay-content" id="secondDay-header">
              <Typography>Второй день</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <List>
                {weekSchedule.secondDay.map((item: string) => {
                  return (
                    <ListItem key={item}>
                      {item}
                    </ListItem>
                  )
                })
                }
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel
            square expanded={expanded === 'thirdDay'}
            onChange={handleChange('thirdDay')}
          >
            <ExpansionPanelSummary aria-controls="thirdDay-content" id="thirdDay-header">
              <Typography>Третий день</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <List>
                {weekSchedule.thirdDay.map((item: string) => {
                  return (
                    <ListItem key={item}>
                      {item}
                    </ListItem>
                  )
                })
                }
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
          >
            Сгенерировать расписание
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = ({ weekScheduleState }: IAppState) => {
  return {
    weekSchedule: weekScheduleState.weekSchedule,
    weekScheduleLoading: weekScheduleState.loading,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getWeekSchedule: () => dispatch(getWeekSchedule()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ExerciseList);
