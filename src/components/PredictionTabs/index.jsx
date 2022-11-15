import * as React from "react";
import PropTypes from "prop-types";
import {
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  Checkbox,
  Slider,
} from "@mui/material";

/**
 * @dev utils for slider
 */
function valuetext(value) {
  return `${value}°C`;
}

const marks = [
  {
    value: 1,
    label: "x1",
  },
  {
    value: 2,
    label: "x2",
  },
  {
    value: 3,
    label: "x3",
  },
  {
    value: 4,
    label: "x4",
  },
  {
    value: 5,
    label: "x5",
  },
];

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

export default function PredictionTabs() {
  const [value, setValue] = React.useState(0);
  const [activeAmount, setActiveAmount] = React.useState(5);
  const [activeQuestionaire, setActiveQuestionaire] = React.useState(3);

  const handleActiveAmount = (amount) => {
    setActiveAmount(amount);
  };
  const handleActiveQuestionaire = (questionaire) => {
    setActiveQuestionaire(questionaire);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }} className="predictionTabs__container">
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Unlimited" {...a11yProps(0)} />
          <Tab label="Duo (2)" {...a11yProps(1)} />
          {/* <Tab label="Trio (3)" {...a11yProps(2)} /> */}
          {/* <Tab label="Nonet (9)" {...a11yProps(3)} /> */}
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="topBar">
          <div>
            <div>Price:</div>
            <Button
              className={activeAmount === 5 ? "active" : ""}
              onClick={() => handleActiveAmount(5)}
            >
              $5
            </Button>
            <Button
              className={activeAmount === 20 ? "active" : ""}
              onClick={() => handleActiveAmount(20)}
            >
              $20
            </Button>
            <Button
              className={activeAmount === 50 ? "active" : ""}
              onClick={() => handleActiveAmount(50)}
            >
              $50
            </Button>
          </div>
          <div>
            <div>Questionaires:</div>
            <Button
              onClick={() => handleActiveQuestionaire(3)}
              className={activeQuestionaire === 3 ? "active" : ""}
            >
              3
            </Button>
            <Button
              onClick={() => handleActiveQuestionaire(4)}
              className={activeQuestionaire === 4 ? "active" : ""}
            >
              4
            </Button>
          </div>
        </div>

        <div className="questionaires">
          <div className="questionItem">
            <div className="top">
              <p>
                1. Which of the two teams leads in the first half of the match?
              </p>
              <p>20 Points</p>
            </div>
            <div className="answers">
              <div className="label">
                <Checkbox />
                Sweden
              </div>
              <div className="label">
                <Checkbox />
                Draw
              </div>
              <div className="label">
                <Checkbox />
                Brazil
              </div>
            </div>
          </div>
          <div className="questionItem">
            <div className="top">
              <p>
                2. Which of the two teams leads in the first half of the match?
              </p>
              <p>30 Points</p>
            </div>
            <div className="answers">
              <div className="label">
                <Checkbox />
                Sweden
              </div>
              <div className="label">
                <Checkbox />
                Draw
              </div>
              <div className="label">
                <Checkbox />
                Brazil
              </div>
            </div>
          </div>
          <div className="questionItem">
            <div className="top">
              <p>
                3. Which of the two teams leads in the first half of the match?
              </p>
              <p>50 Points</p>
            </div>
            <div className="answers">
              <div className="label">
                <Checkbox />
                Sweden
              </div>
              <div className="label">
                <Checkbox />
                Draw
              </div>
              <div className="label">
                <Checkbox />
                Brazil
              </div>
            </div>
          </div>
          {activeQuestionaire === 4 && (
            <div className="questionItem">
              <div className="top">
                <p>
                  4. Which of the two teams leads in the first half of the
                  match?
                </p>
                <p>20 Points</p>
              </div>
              <div className="answers">
                <div className="label">
                  <Checkbox />
                  Sweden
                </div>
                <div className="label">
                  <Checkbox />
                  Draw
                </div>
                <div className="label">
                  <Checkbox />
                  Brazil
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="predictionAmount">
          <div>
            <h4>Prediction Count:</h4>
            <Slider
              aria-label="Custom marks"
              defaultValue={1}
              getAriaValueText={valuetext}
              step={1}
              valueLabelDisplay="auto"
              marks={marks}
              max={5}
              min={1}
            />
          </div>

          <div>
            <div className="top">
              <h4>Total Amount: $5</h4>
              <h4>Available: $10</h4>
            </div>
            <Button>Predict</Button>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Two
      </TabPanel>
    </Box>
  );
}
