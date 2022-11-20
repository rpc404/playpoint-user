import { Tabs, Tab, Box } from "@mui/material";
import * as React from "react";
import { a11yProps, TabPanel } from "./components/MuiTabsHelpers";
import PoolType from "./components/TabByPool";

export default function PredictionTabs({ poolSize, setPoolSize, fixtureId }) {
  const [value, setValue] = React.useState(0);
  const [userPrediction, setUserPrediction] = React.useState({
    activeAmount: 5,
    activeQuestionaire: 4,
  });

  /**
   *
   * @dev this state is for MUI tabs
   */
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }} className="predictionTabs__container">
      {/* @note Pool Type */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Unlimited"
            onClick={() => setPoolSize("unlimited")}
            {...a11yProps(0)}
          />
          <Tab
            label="Duo (2)"
            onClick={() => setPoolSize("duo")}
            {...a11yProps(1)}
          />
          {/* <Tab label="Trio (3)" {...a11yProps(2)} /> */}
          {/* <Tab label="Nonet (9)" {...a11yProps(3)} /> */}
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <PoolType
          poolSize={poolSize}
          fixtureId={fixtureId}
          setUserPrediction={setUserPrediction}
          userPrediction={userPrediction}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PoolType
          poolSize={poolSize}
          fixtureId={fixtureId}
          setUserPrediction={setUserPrediction}
          userPrediction={userPrediction}
        />
      </TabPanel>
      {/* <TabPanel value={value} index={2}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Two
      </TabPanel> */}
    </Box>
  );
}
