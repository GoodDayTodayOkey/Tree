import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'transparent',
    },
  }),
);


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
    <div style={{ display: 'flex' }}>
      <div>
        <div>Prepared tree:</div>
        <pre>{`${JSON.stringify({ ...renderTreeItem(users) }, undefined, 4)}`}</pre>
      </div>
      <div>
        <div>Of store:</div>
        <pre>{`${JSON.stringify({ users }, undefined, 4)}`}</pre>
      </div>
    </div>
  );
}

export default JSONTree;