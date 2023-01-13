import React, { useState } from "react";
import "./styles/style.css";
import { Helmet } from "react-helmet";
import { getUserPredictions } from "../../api/Prediction";
import { useRPCContext } from "../../contexts/WalletRPC/RPCContext";
import { ACTIONS } from "../../contexts/WalletRPC/RPCReducer";
import { setProfile } from "../../api/Profile";
import { usePredictionsContext } from "../../contexts/Predictions/PredictionsContext";
import { getuserResults } from "../../api/Results";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { ethers } from "ethers";
import ERC20BasicAPI from "../../utils/ERC20BasicABI.json";
import ProfileComponent from "../../components/Profile/";
import { useMediaQuery } from "@mui/material";
import Transaction from "../transaction";
import moment from "moment/moment";
import Badge from "@mui/material/Badge";

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

  const [editMode, setEditMode] = useState(false);
  const [{ userPublicAddress, username, isWalletConnected, isNonWalletUser }, dispatchRPCData] =
    useRPCContext();
  const [{ results, woat }, dispatchPredictionsData] = usePredictionsContext();
  const [_username, setUsername] = useState(username);
  const [value, setValue] = React.useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const [balance, setBalance] = React.useState({
    ethBalance: 0,
    ppttBalance: 0,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  React.useEffect(() => {
    if (userPublicAddress) {
      (async () => {
        const res = await getuserResults(userPublicAddress);
        dispatchPredictionsData({
          type: "get-results",
          payload: res.data.reverse(),
        });
      })();
    }
    if (username) {
      setUsername(username);
    }
  }, [userPublicAddress]);

  React.useEffect(() => {
    if (isWalletConnected && !isNonWalletUser) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const contract = new ethers.Contract(
        "0x53d168578974822bCAa95106C7d5a906BF100948",
        ERC20BasicAPI,
        provider
      );
      (async () => {
        const ethBalance = await provider.getBalance(userPublicAddress);
        const PPTTBalance = await contract.balanceOf(userPublicAddress);

        setBalance({
          ethBalance: ethers.utils.formatEther(ethBalance),
          ppttBalance: ethers.utils.formatEther(PPTTBalance),
        });
      })();
    }
  }, [isWalletConnected]);

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


  return (
    <div className="profile__container">
      <Helmet>
        <title>Profile | Playpoint</title>
      </Helmet>
      <div className="tabs">
        <Tabs
          orientation={
            useMediaQuery("(min-width:769px)") ? "vertical" : "horizontal"
          }
          onChange={handleChange}
          value={value}
          aria-label="Vertical tabs example"
          variant={useMediaQuery("(max-width:768px)") ? "scrollable" : "fullWidth"}
          indicatorColor= "secondary"
          sx={{backgroundColor:"#0D1016"}}
        >
          <Tab label = "Profile" icon={<i className="ri-user-line"></i>} {...a11yProps(0)} />
          <Tab
          label="Transaction"
            icon={<i className="ri-exchange-funds-line"></i>}
            {...a11yProps(1)}
          />
        </Tabs>
      </div>
      <div className="profile__header">
        <div className="profile__box">
          <div className="username">
            <h3>
              Hello,<span>{username}</span>
            </h3>
            <p>Today is {moment().format("MMMM Do YYYY")} </p>
          </div>
          <div className="profleImage_box">
            <p>
              <Badge color="success" variant="dot">
                <i className="ri-chat-3-line"></i>
              </Badge>
            </p>
            <p>
              <Badge color="success" variant="dot">
                <i className="ri-notification-line"></i>
              </Badge>
            </p>
            <img
              src={`https://robohash.org/${username}`}
              alt="robohash_image"
              loading="lazy"
            />
          </div>
        </div>
        <TabPanel value={value} index={0}>
          <div className="userProfile">
            <ProfileComponent
              username={username}
              balance={balance}
              results={results}
              woat={woat}
            />
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Transaction />
        </TabPanel>
      </div>
    </div>
  );
}
