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
import { Typography, useMediaQuery } from "@mui/material";
import Transaction from "../transaction";
import moment from "moment/moment";
import Badge from "@mui/material/Badge";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import EditProfile from "../../components/EditProfile/EditProfile";
import { useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";

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

//
const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

export default function Profile() {
  const [userProfile, setUserProfile] = React.useState([]);

  const [editMode, setEditMode] = useState(false);
  const [
    { userPublicAddress, username, isWalletConnected, isNonWalletUser },
    dispatchRPCData,
  ] = useRPCContext();
  const [{ results, woat }, dispatchPredictionsData] = usePredictionsContext();
  const [_username, setUsername] = useState(username);
  const [value, setValue] = React.useState(0);

  const [balance, setBalance] = React.useState({
    ethBalance: 0,
    ppttBalance: 0,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const location = useLocation();

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

  React.useEffect(() => {
    let path = location.pathname;
    if (path === "/profile" && value !== 0) setValue(0);
    else if (path === "/profile/transaction" && value !== 1) setValue(1);
    else if (path === "/profile/edit" && value !== 2) setValue(2);
  }, [value]);

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
          variant={
            useMediaQuery("(max-width:768px)") ? "scrollable" : "fullWidth"
          }
          sx={{ backgroundColor: "#0D1016" }}
        >
          <Tab
            label="Profile"
            icon={<i className="ri-user-line"></i>}
            {...a11yProps(0)}
            LinkComponent={Link}
            to="/profile"
          />
          <Tab
            label="Transaction"
            icon={<i className="ri-exchange-funds-line"></i>}
            {...a11yProps(1)}
            LinkComponent={Link}
            to="/profile/transaction"
          />
          <Tab
            label="Edit"
            icon={<i className="ri-edit-box-line"></i>}
            {...a11yProps(2)}
            LinkComponent={Link}
            to="/profile/edit"
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
            <div style={{ display: "flex",justifyContent:"space-between" }}>
              <p className="address">
                {String(userPublicAddress).substring(0, 5) +
                  "..." +
                  String(userPublicAddress).substring(
                    userPublicAddress.length - 5
                  )}
                <i
                  className="ri-file-copy-line"
                  onClick={() =>
                    navigator.clipboard
                      .writeText(userPublicAddress)
                      .then(() => {
                        toast("Account address copied");
                      })
                  }
                ></i>
              </p>
              {/* <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Off</Typography>
                <AntSwitch
                  defaultChecked
                  inputProps={{ "aria-label": "ant design" }}
                />
                <Typography>On</Typography>
              </Stack> */}
            </div>
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
        <TabPanel value={value} index={2}>
          <EditProfile />
        </TabPanel>
      </div>
    </div>
  );
}
