// import React from 'react';
// import { useSelector } from 'react-redux';


// function App() {

//   const store = useSelector(state => state);
//   return (
//     <div>
//       Welcome to Next.js!?
//       {`${store.count.count}`}
//     </div>
//   )
// }

// export default App


import fetch from 'isomorphic-unfetch'
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadData } from '../store/actions';
import Tree from '../components/Tree/Tree';
import Tab from '@material-ui/core/Tab';
import accessibilityProps from '../helpers/accessibilityProps';
import CustomTabs from '../components/CustomTabs/CustomTabs';
import CustomTree from '../components/CustomTree/CustomTree';
import TabPanel from '../components/CustomTabs/components/TabPanel';

function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadData());
  }, []);

  const tabs = useSelector(state => state.tabs.data.tree);
  const users = useSelector(state => state.users.data);
  return (
    <div>
      <CustomTabs
        bar={() => tabs.map((tab, index) => <Tab key={index} label={tab} {...accessibilityProps(index)} />)}
        panel={(value) => tabs.map((tab, index) => <TabPanel key={index} value={value} index={index}><CustomTree kind={tab} users={users} /></TabPanel>)}
      />
      {/* <Tree /> */}
    </div>
  )
}

export default HomePage