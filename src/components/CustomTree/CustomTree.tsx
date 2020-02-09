import React, { useState } from 'react';
import TreeItem from '@material-ui/lab/TreeItem';

import TreeView from '@material-ui/lab/TreeView';
import DetailsIcon from '@material-ui/icons/Details';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import CustomAttr from '../CustomAttr/CustomAttr'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: 'transparent',
    },
    treeView: {
      maxWidth: '400px',
      backgroundColor: 'transparent'
    },
    treeView__item: {
      backgroundColor: 'transparent',
      margin: '10px'
    },
    selected: {
      backgroundColor: 'transparent !important',
    },
  }),
);


function CustomTree({ kind, users }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const handleChange = (event: React.ChangeEvent<{}>, nodes: string[]) => {
    setExpanded(nodes);
  };

  const getTypeTree = (kind) => {
    const typeList = {
      'explorer': () => (
        <TreeView
          className={classes.treeView}
          defaultCollapseIcon={<DetailsIcon fontSize='small' />}
          defaultExpandIcon={<PlayArrowIcon />}
          defaultEndIcon={<SvgIcon />}
          expanded={expanded}
          onNodeToggle={handleChange}
        >
          {renderItems(users)}
        </TreeView>
      ),
      'json': () => {
        console.log(users)
        return (
          <div>
            <div>Of store:</div>
            <pre>{`${JSON.stringify({ users: users }, undefined, 4)}`}</pre>
          </div>
        )
      },
    }
    return typeList[kind]();
  }

  const renderItems = (users) => {
    if (users && users.length) {
      const tree = ({ id }: { id: string }) => {

        const parent = users.filter(user => id ? user.id === id : user.parent === id)[0];
        return [
          <TreeItem
            key={parent.id}
            nodeId={parent.id}
            label={<CustomAttr position={parent.position} attrs={parent.attributes} parentId={parent.id} />}
            className={classes.treeView__item}
            classes={{ content: classes.selected }}
          >
            {parent.children.map(child => { return tree({ id: child }) })}
          </TreeItem>
        ]
      }
      return tree({ id: '' });
    }
    return [];
  }

  return (
    <>
      {getTypeTree(kind)}
    </>
  );
}

export default CustomTree;