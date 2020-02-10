import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tab from '@material-ui/core/Tab';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import CustomTabs from '../components/CustomTabs/CustomTabs';
import CustomTrees from '../components/CustomTrees/CustomTrees';
import TabPanel from '../components/CustomTabs/components/TabPanel';
import { loadData } from '../store/actions';
import { selectTree, selectUsers } from '../store/selectors';

function HomePage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadData());
  }, []);

  const tabs = useSelector(selectTree);
  const users = useSelector(selectUsers);
  const makeBar = () => tabs.map((tab, index) => <Tab key={index} label={tab} {...accessibilityProps(index)} />)
  const makePanel = (value) => tabs.map((tab, index) => (
    <TabPanel key={index} value={value} index={index}>
      <CustomTrees kind={tab} users={users} />
    </TabPanel>));

  const accessibilityProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  return (
    <div className={classes.homePage}>
      <CustomTabs
        makeBar={makeBar}
        makePanel={makePanel}
      />
    </div>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    homePage: {},
  }),
);

export default HomePage