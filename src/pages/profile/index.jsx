import React, { useState } from "react";
import "./styles/style.css";
import { Helmet } from "react-helmet";
import { getUserPredictions } from "../../api/Prediction";
import { useRPCContext } from "../../contexts/WalletRPC/RPCContext";
import { ACTIONS } from "../../contexts/WalletRPC/RPCReducer";
import { setProfile } from "../../api/Profile";
import { toast } from "react-toastify";
import { usePredictionsContext } from "../../contexts/Predictions/PredictionsContext";
import { getuserResults } from "../../api/Results";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { ethers } from "ethers";
import ERC20BasicAPI from "../../utils/ERC20BasicABI.json";
import { Link } from "react-router-dom";
import ProfileComponent from "../../components/Profile/";
import { useMediaQuery } from "@mui/material";

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
  const [{ userPublicAddress, username, isWalletConnected }, dispatchRPCData] =
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
        console.log(res);
        dispatchPredictionsData({ type: "get-results", payload: res.data });
      })();
    }
    if (username) {
      setUsername(username);
    }
  }, [userPublicAddress]);

  React.useEffect(() => {
    if (isWalletConnected) {
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

  const handlePageClick = (ev) => {
    const page = ev.target.innerText;
    setHistory(userProfile.slice((page - 1) * 10, page * 10));
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
          variant={useMediaQuery("(max-width:768px)") && "scrollable"}
        >
          <Tab icon={<i className="ri-user-line"></i>} {...a11yProps(0)} />
          <Tab
            icon={<i className="ri-exchange-funds-line"></i>}
            {...a11yProps(1)}
            LinkComponent={Link}
            to="/transaction"
          />
          <Tab label="Item Three" {...a11yProps(2)} />
          <Tab label="Item Four" {...a11yProps(3)} />
          <Tab label="Item Five" {...a11yProps(4)} />
          <Tab label="Item Six" {...a11yProps(5)} />
          <Tab label="Item Seven" {...a11yProps(6)} />
        </Tabs>
      </div>
      <div className="userProfile">
        <TabPanel value={value} index={0}>
          <ProfileComponent
            username={username}
            balance={balance}
            results={results}
            woat={woat}
          />
        </TabPanel>
      </div>
    </div>
  );
}
