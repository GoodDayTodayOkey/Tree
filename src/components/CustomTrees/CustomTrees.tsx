import React from 'react';

import ExplorerTree from './components/ExplorerTree';
import JSONTree from './components/JSONTree';

function CustomTree({ kind, users }) {
  const getTypeTree = (kind) => {
    const typeList = {
      'explorer': () => <ExplorerTree users={users} />,
      'json': () => <JSONTree users={users} />
    }
    return typeList[kind]();
  }
  return <>{getTypeTree(kind)}</>;
}

export default CustomTree;