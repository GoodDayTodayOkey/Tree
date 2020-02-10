
import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      className={classes.tabPanel}
    >
      {value === index && <Box className={classes.tabPanel__title} p={3}>{children}</Box>}
    </Typography>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tabPanel: {},
    tabPanel__title: {},
  }),
);

export default TabPanel
