import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import DetailsIcon from '@material-ui/icons/Details';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SvgIcon from '@material-ui/core/SvgIcon';

import CustomAttr from '../../CustomExpansionPanel/CustomExpansionPanel'

function ExplorerTree({ users }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState<string[]>([]);
  const handleChange = (event: React.ChangeEvent<{}>, nodes: string[]) => {
    setExpanded(nodes);
  };
  const { treeItem__item, treeItem__content, treeView } = classes;
  const renderTreeItem = (users) => {
    if (users && users.length) {
      const makeTreeItem = ({ initialId }) => {
        const parent = users.filter(user => initialId ? user.id === initialId : user.parent === initialId)[0];
        const { id, position, attributes, children: childrenIds } = parent;
        const children = childrenIds.map(childrenId => { return makeTreeItem({ initialId: childrenId }) });
        return [
          <TreeItem
            key={id}
            nodeId={id}
            label={<CustomAttr position={position} attrs={attributes} parentId={id} />}
            className={treeItem__item}
            classes={{ content: treeItem__content }}
          >
            {children}
          </TreeItem>
        ]
      }
      return makeTreeItem({ initialId: '' });
    }
    return [];
  }

  return (
    <TreeView
      className={treeView}
      defaultCollapseIcon={<DetailsIcon fontSize='small' />}
      defaultExpandIcon={<PlayArrowIcon />}
      defaultEndIcon={<SvgIcon />}
      expanded={expanded}
      onNodeToggle={handleChange}
    >
      {renderTreeItem(users)}
    </TreeView>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    treeView: {
      maxWidth: '400px',
      backgroundColor: 'transparent'
    },
    treeItem__item: {
      backgroundColor: 'transparent',
      margin: '10px'
    },
    treeItem__content: {
      backgroundColor: 'transparent !important',
    },
  }),
);

export default ExplorerTree;