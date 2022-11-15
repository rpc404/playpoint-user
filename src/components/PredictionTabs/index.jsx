import * as React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box } from "@mui/material";
import { getQuestionaireByFixtureId } from "../../api/Prediction";
import PoolType from "./components/TabByPool";

/**
 * @dev utils for tabs
 */
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"div"} variant="p">
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function PredictionTabs({ setPoolSize, fixtureId }) {
  const [value, setValue] = React.useState(0);
  const [userPrediction, setUserPrediction] = React.useState({
    activeAmount: 5,
    activeQuestionaire: 3,
  });

  const [questionaire, setQuestionaire] = React.useState([]);

  /**
   *
   * @dev this state is for MUI tabs
   */
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    (async () => {
      const allQuestionairesByFixtureId = await getQuestionaireByFixtureId(
        fixtureId
      );
      // console.log(allQuestionairesByFixtureId);
      setQuestionaire(allQuestionairesByFixtureId.data?.questionaire);
    })();
  }, []);

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
            onClick={() => setPoolSize("Duo (2 Players)")}
            {...a11yProps(1)}
          />
          {/* <Tab label="Trio (3)" {...a11yProps(2)} /> */}
          {/* <Tab label="Nonet (9)" {...a11yProps(3)} /> */}
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <PoolType
          setUserPrediction={setUserPrediction}
          userPrediction={userPrediction}
        />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PoolType
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
