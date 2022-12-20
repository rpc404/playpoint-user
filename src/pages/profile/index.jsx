import React, { useState } from "react";
import "./styles/style.css";
import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Helmet } from "react-helmet";
import { getUserPredictions } from "../../api/Prediction";
import moment from "moment";
import { useRPCContext } from "../../contexts/WalletRPC/RPCContext";
import { ACTIONS } from "../../contexts/WalletRPC/RPCReducer";
import { setProfile } from "../../api/Profile";
import { toast } from "react-toastify";
import { getCountryShortName } from "../../components/Leaderboards/Leaderboards";
import { usePredictionsContext } from "../../contexts/Predictions/PredictionsContext";
import { getuserResults } from "../../api/Results";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Profile() {
  const [userProfile, setUserProfile] = React.useState([]);
  const [history, setHistory] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [{ userPublicAddress, username }, dispatchRPCData] = useRPCContext();
  const [{ results, woat }, dispatchPredictionsData] = usePredictionsContext();
  const [_username, setUsername] = useState(username);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (userPublicAddress) {
      (async () => {
        const res = await getuserResults(userPublicAddress);
        console.log(res);
        dispatchPredictionsData({ type: "get-results", payload: res.data });
      })();
    }
    if (username) {
      setUsername(username);
    }
  }, [userPublicAddress]);

  const handleUpdate = async () => {
    await setProfile({ data: { username: _username, userPublicAddress } }).then(
      (res) => {
        const rpcUserData = {
          isWalletConnected: true,
          userPublicAddress: userPublicAddress,
          username: _username,
        };
        localStorage.setItem("rpcUserData", JSON.stringify(rpcUserData));
      }
    );
    dispatchRPCData({
      type: ACTIONS.UPDATE_USERNAME,
      payload: { username: _username },
    });
    setEditMode(false);
  };

  const handlePageClick = (ev) => {
    const page = ev.target.innerText;
    setHistory(userProfile.slice((page - 1) * 10, page * 10));
  };

  return (
    <div className="profile__container">
      <Helmet>
        <title>Profile | Playpoint</title>
      </Helmet>
      <div className="blob1"></div>

      <div className="userData__container">
        <div className="userData">
          <img src={`https://robohash.org/${username}`} alt="" loading="lazy" />
          <div className="userdetails__container">
            {editMode ? (
              <div className="userdetails">
                <fieldset>
                  <input
                    value={_username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={username}
                  />
                  <p
                    className="accountbtn"
                    onClick={() => {
                      navigator.clipboard.writeText(userPublicAddress),
                        toast("Account number copied!");
                    }}
                  >
                    <>
                      {`${userPublicAddress}`.substring(0, 15) +
                        `...` +
                        `${userPublicAddress}`.substring(
                          userPublicAddress.length - 3
                        )}{" "}
                      <i className="ri-file-copy-line"></i>
                    </>
                  </p>
                  <Button onClick={() => handleUpdate()}>
                    <i className="ri-send-plane-fill"></i>
                  </Button>
                </fieldset>
              </div>
            ) : (
              <div className="userdetails">
                <fieldset>
                  <h2>@{username}</h2>
                  <p
                    className="accountbtn"
                    onClick={() => {
                      navigator.clipboard.writeText(userPublicAddress),
                        toast("Account number copied!");
                    }}
                  >
                    <>
                      {`${userPublicAddress}`.substring(0, 15) +
                        `...` +
                        `${userPublicAddress}`.substring(
                          userPublicAddress.length - 3
                        )}{" "}
                      <i className="ri-file-copy-line"></i>
                    </>
                  </p>
                  <Button onClick={() => setEditMode(!editMode)}>
                    <i className="ri-pencil-fill"></i>
                  </Button>
                </fieldset>
              </div>
            )}
          </div>
          <Button className="addMoneyBtn">
            <i className="ri-add-box-line"></i> Add Money
          </Button>
        </div>
      </div>
     
        <div className="summary__container">
          <div className="summaryItem">
            <i className="ri-money-dollar-circle-line"></i>
            <div>
              <p>Your money in pool</p>
              <h3>500 PPTT</h3>
            </div>
          </div>
          <div className="summaryItem">
            <i className="ri-bar-chart-grouped-line"></i>
            <div>
              <p>Winnings of all time</p>
              <h3>{woat} PPTT</h3>
            </div>
          </div>
        </div>
      <div className="history__container">
        <div className="profile-menus__container">
          <Box
            sx={{
              flexGrow: 2,
              bgcolor: "none",
              display: "flex",
              height: 254,
              gap: "12px",
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Profile Menu"
              textColor="white"
              sx={{ borderRight: 1, borderColor: "divider", color:"white" }}
            >
              <Tab label="Settled Predictions" {...a11yProps(0)} />
              <Tab label="Unsettled Predictions" {...a11yProps(1)} />
              <Tab label="Duo Challenges" {...a11yProps(2)} />
              <Tab label="Trio Challenges" {...a11yProps(3)} />
              <Tab label="All Transcations" {...a11yProps(4)} />
              <Tab label="Extra" {...a11yProps(5)} />
            </Tabs>
            <TabPanel
              value={value}
              index={0}
              style={{ flex: 1, marginTop: "1em" }}
            >
              <div>
                <p style={{ textAlign: "center", padding: "10px", color:"#fff" }}>
                  <em>
                    Settled Predictions are those predictions for which either
                    you're rewarded or lose.
                  </em>
                </p>
                <div className="titles">
                  <p>ID</p>
                  <p>Points</p>
                  <p>win/lose amount</p>
                  <p>match</p>
                  <p>date/time</p>
                  <p>Transaction</p>
                </div>
                <div className="history__items">
                  {results.map((data, index) => {
                    data.result =
                      data.predictionId.amount / 0.02 < data.rewardAmount
                        ? "win"
                        : "lose";
                    return (
                      <div className="history__item" key={index}>
                        <p>{data._id.substring(4, 15)}</p>
                        <p className={data.result}>
                          <span>{data.points || "0"}</span>
                        </p>
                        {/* <p>{data.predictionId.amount / 0.02} PPTT</p> */}
                        <p className={data.result}>
                          {data.result === "win" ? (
                            <>
                              {data.rewardAmount} PPTT ~ $
                              {data.rewardAmount * 0.02}
                            </>
                          ) : (
                            <>
                              <>
                                {data.predictionId.amount / 0.02} PPTT ~ $
                                {data.predictionId.amount}
                              </>
                            </>
                          )}
                        </p>
                        <p>
                          <b>
                            {getCountryShortName(
                              data?.predictionId?.fixtureId?.HomeTeam
                            ) || "-"}
                          </b>{" "}
                          VS{" "}
                          <b>
                            {getCountryShortName(
                              data?.predictionId?.fixtureId?.AwayTeam
                            ) || "-"}
                          </b>
                        </p>
                        <p>{moment(data.created_at).format("LL")}</p>
                        <p>{data?.txnhash}</p>
                      </div>
                    );
                  })}
                </div>
                <Stack spacing={2}>
                  <Pagination
                    count={Math.floor(results.length / 10)}
                    shape="rounded"
                    className="pagination"
                    onClick={(e) => handlePageClick(e)}
                    hideNextButton
                    hidePrevButton
                  />
                </Stack>
              </div>
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
          </Box>
        </div>
      </div>

      <div className="mobhistory_container">
        {results.map((data, i) => {
          data.result =
            data.predictionId.amount / 0.02 < data.rewardAmount
              ? "win"
              : "lose";
          return (
            <div className="card" key={i}>
              <div className="id__container">
                <p className="id">
                  ID: <em>{data._id.substring(4, 15)}</em>
                </p>
              </div>
              <p className="amount">
                {` Amount: $${data.predictionId.amount}~${data.predictionId.amount} PPTT`}
              </p>
              <p className="result">Result:{data.result || "--"}</p>
              <p className="win-lose">
                win/lose amount:{" "}
                {data.result === "win" || data.result === "lose" ? (
                  <>
                    ${data.rewardAmount}~{data.rewardAmount * 0.02} PPTT
                  </>
                ) : (
                  <>{"-"}</>
                )}
              </p>
              <p className="match">
                Match: <b>{data?.fixtureId?.HomeTeam || "-"}</b> VS{" "}
                <b>{data?.fixtureId?.AwayTeam || "-"}</b>
              </p>
              <p className="date">
                Date:{moment(data?.created_at).format("LT")}
              </p>
              {data.result && (
                <div className={`winlose`}>
                  <p className={data.result}>{data.result}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
