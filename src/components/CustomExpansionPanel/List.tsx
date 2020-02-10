import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

function List({ attrs }) {
  const classes = useStyles();
  return (
    <>{Object.keys(attrs).map((attr, i) => (<Typography className={classes.list} key={i}>{`${attr} : ${attrs[attr]}`}</Typography>))}</>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {},
  }),
);

export default List;