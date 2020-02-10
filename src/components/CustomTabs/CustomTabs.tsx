import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 216,
      flexGrow: 1,
      width: '100%',
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

function CustomTabs({ makeBar, makePanel }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    event.stopPropagation();
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} TabIndicatorProps={{ style: { backgroundColor: "red" } }} onChange={handleChange} aria-label="simple tabs example">
          {makeBar()}
        </Tabs>
      </AppBar>
      {makePanel(value)}
    </div>
  );
}

export default CustomTabs;