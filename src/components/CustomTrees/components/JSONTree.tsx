import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

function JSONTree({ users }) {
  const classes = useStyles();

  const renderTreeItem = (users) => {
    if (users && users.length) {
      const makeTreeItem = ({ initialId }) => {
        const parent = users.filter(user => initialId ? user.id === initialId : user.parent === initialId)[0];
        const { children: childrenIds } = parent;
        return { ...parent, children: childrenIds.map(childrenId => makeTreeItem({ initialId: childrenId })) }
      }
      return makeTreeItem({ initialId: '' });
    }
    return {};
  }

  return (
    <div className={classes.jsonTree}>
      <div className={classes.jsonTree__preparedTree}>
        <div className={classes.jsonTree__title}>Prepared tree:</div>
        <pre className={classes.jsonTree__item}>{`${JSON.stringify({ ...renderTreeItem(users) }, undefined, 4)}`}</pre>
      </div>
      <div className={classes.jsonTree__store}>
        <div className={classes.jsonTree__title}>Of store:</div>
        <pre className={classes.jsonTree__item}>{`${JSON.stringify({ users }, undefined, 4)}`}</pre>
      </div>
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    jsonTree: { display: 'flex' },
    jsonTree__preparedTree: {},
    jsonTree__title: {},
    jsonTree__item: {},
    jsonTree__store: {},
  }),
);

export default JSONTree;