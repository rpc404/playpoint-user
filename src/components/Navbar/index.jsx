import * as React from "react";
import {
  Box,
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import "./styles/style.css";
import { useRPCContext } from "../../contexts/WalletRPC/RPCContext";
import { ACTIONS } from "../../contexts/WalletRPC/RPCReducer";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import ERC20BasicAPI from "../../utils/ERC20BasicABI.json";
const { ethereum } = window;

export default function Navbar({ toggleAuthenticationDrawer }) {
  const navigate = useNavigate();
  const [
    {
      isWalletConnected,
      username,
      userPublicAddress,
      network,
      isNonWalletUser,
    },
    dispatchRPCData,
  ] = useRPCContext();
  const [balance, setBalance] = React.useState({
    ethBalance: 0,
    ppttBalance: 0,
  });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (!isNonWalletUser) {
      if (isWalletConnected && network === "arbitrum") {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const contract = new ethers.Contract(
          import.meta.env.VITE_BETA_PPTT_CONTRACT_ADDRESS,
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
          const data = {
            isWalletConnected,
            username,
            userPublicAddress,
            network,
            userPPTTBalance: ethers.utils.formatEther(PPTTBalance),
            userETHBalance: ethers.utils.formatEther(ethBalance),
          };

          await dispatchRPCData({
            type: ACTIONS.WALLET_CONNECT,
            payload: data,
          });
        })();
      }

      if (isWalletConnected && network === "shasta") {
        setBalance({
          ethBalance: 0,
          ppttBalance: 0,
        });

        (async () => {
          const data = {
            isWalletConnected,
            username,
            userPublicAddress,
            userPPTTBalance: 0,
            userETHBalance: 0,
            network,
          };

          await dispatchRPCData({
            type: ACTIONS.WALLET_CONNECT,
            payload: data,
          });
        })();
      }
    } 
    else {
      if (isWalletConnected && network === "arbitrum") {
        (async () => {
          const ethBalance = 100 * 10 ** 12;
          const PPTTBalance = 100 * 10 ** 18;
          setBalance({
            ethBalance: ethers.utils.formatEther(ethBalance),
            ppttBalance: ethers.utils.formatEther(PPTTBalance),
          });
          const data = {
            isWalletConnected,
            username,
            userPublicAddress,
            network,
            userPPTTBalance: ethers.utils.formatEther(PPTTBalance),
            userETHBalance: ethers.utils.formatEther(ethBalance),
          };

          await dispatchRPCData({
            type: ACTIONS.WALLET_CONNECT,
            payload: data,
          });
        })();
      }

      if (isWalletConnected && network === "shasta") {
        setBalance({
          ethBalance: 0,
          ppttBalance: 0,
        });

        (async () => {
          const data = {
            isWalletConnected,
            username,
            userPublicAddress,
            userPPTTBalance: 0,
            userETHBalance: 0,
            network,
          };

          await dispatchRPCData({
            type: ACTIONS.WALLET_CONNECT,
            payload: data,
          });
        })();
      }
    }
  },
   [isWalletConnected, userPublicAddress, network]);

  console.log(balance);

  const handleLogout = () => {
    dispatchRPCData({ type: ACTIONS.WALLET_DISCONNECT });
    toast.error("Wallet Disconnected!");
  };

  /**
   * @dev NavbarSM Devices drawer utilsLogin
   */
  const [navSMState, setnavSMState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setnavSMState({ ...navSMState, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {isWalletConnected && (
        <div className="userData__container">
          <List>
            <ListItem disablePadding>
              <div className="navUserData">
                <img
                  src={`https://robohash.org/${username}`}
                  alt=""
                  loading="lazy"
                />
                <h2>@{username}</h2>
                <div className="balance__wrapper">
                  <div className="balance">
                    <img
                      src="https://ethereum.org/static/4f10d2777b2d14759feb01c65b2765f7/69ce7/eth-glyph-colored.webp"
                      alt="ethereum"
                      loading="lazy"
                    />
                    <p>{parseFloat(balance.ppttBalance)} PPTT</p>
                  </div>
                  <div className="balance">
                    <img
                      src="https://ethereum.org/static/c48a5f760c34dfadcf05a208dab137cc/3a0ba/eth-diamond-rainbow.webp"
                      alt="ethereum"
                      loading="lazy"
                    />
                    <p>{parseFloat(balance.ethBalance).toFixed(2)} ETH</p>
                  </div>
                </div>
                <Button
                  className="addMoneyBtn"
                  onClick={() =>
                    window.open("https://app.playpoint.ai/", "_blank")
                  }
                >
                  <i className="ri-add-box-line"></i>
                  Add Money
                </Button>
              </div>
            </ListItem>
          </List>
          <List>
            <ListItem disablePadding onClick={() => navigate("/profile")}>
              <ListItemButton className="drawerListItem">
                <i className="ri-user-line"></i>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      )}
      {isWalletConnected && <Divider />}
      <List>
        <ListItem disablePadding onClick={() => navigate("/leaderboards")}>
          <ListItemButton className="drawerListItem">
            <i className="ri-bar-chart-grouped-line"></i>
            <ListItemText primary="Leaderboards" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding onClick={() => navigate("/marketplace")}>
          <ListItemButton className="drawerListItem">
            <i className="ri-football-line"></i>
            <ListItemText primary="Marketplaces" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding onClick={() => navigate("/challenges")}>
          <ListItemButton className="drawerListItem">
            <i className="ri-gift-line"></i>
            <ListItemText primary="Challenges" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      {!isWalletConnected ? (
        <List>
          <ListItem disabled={loading} disablePadding>
            <ListItemButton
              className="drawerListItem"
              onClick={() => toggleAuthenticationDrawer()}
            >
              <i className="ri-fingerprint-line"></i>
              <ListItemText primary="Login / Register" />
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem disablePadding onClick={() => handleLogout()}>
            <ListItemButton className="drawerListItem">
              <i className="ri-logout-box-line"></i>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      )}
      <Divider />
    </Box>
  );
  return (
    <>
      <div className="navbar__container">
        <div className="logo__container">
          <img
            onClick={(e) => {
              e.stopPropagation();
              navigate("/");
            }}
            src="https://ik.imagekit.io/domsan/Logo_0vBSw9piY.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1662803005580"
          />
          <h3
            onClick={(e) => {
              e.stopPropagation();
              navigate("/");
            }}
          >
            Playpoint
          </h3>

          <div className="navLinks">
          <div
              onClick={(e) => {
                e.stopPropagation();
                navigate("/");
              }}
            >
              Home
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                window.open("https://docs.playpoint.ai/");
              }}
            >
              Documentation
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate("/leaderboards");
              }}
            >
              Leaderboards
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate("/marketplace");
              }}
            >
              Marketplace
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                navigate("/challenges");
              }}
            >
              Challenges
            </div>
          </div>
        </div>

        <div className="navbar__authentication">
          <button
            onClick={() => window.open("https://app.playpoint.ai/")}
            className="buyButton"
          >
            <i className="ri-coin-fill"></i>
            Buy PPTT
          </button>
          {isWalletConnected === false ? (
            <Button
              disabled={loading}
              onClick={() => toggleAuthenticationDrawer()}
            >
              👛 Connect Wallet
            </Button>
          ) : (
            <>
              <div
                className="balance"
                onClick={(e) => {
                  if (!isNonWalletUser) {
                    e.stopPropagation();
                    ethereum
                      .request({
                        method: "wallet_watchAsset",
                        params: {
                          type: "ERC20",
                          options: {
                            address: import.meta.env
                              .VITE_BETA_PPTT_CONTRACT_ADDRESS,
                            symbol: "PPTT",
                            decimals: 18,
                            image: "https://ik.imagekit.io/lexworld/Logo.png",
                          },
                        },
                      })
                      .then((success) => {
                        if (success) {
                          toast("PPTT successfully added to wallet!");
                        } else {
                          throw new Error("Something went wrong.");
                        }
                      })
                      .catch(console.error);
                  }
                }}
              >
                <img
                  src="https://ethereum.org/static/4f10d2777b2d14759feb01c65b2765f7/69ce7/eth-glyph-colored.webp"
                  alt="ethereum"
                  loading="lazy"
                />
                <p>{parseFloat(balance.ppttBalance).toFixed(2)} PPTT</p>
              </div>
              <div className="balance">
                <img
                  src="https://ethereum.org/static/c48a5f760c34dfadcf05a208dab137cc/3a0ba/eth-diamond-rainbow.webp"
                  alt="ethereum"
                  loading="lazy"
                />
                <p>{parseFloat(balance.ethBalance).toFixed(2)} ETH</p>
              </div>
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/profile");
                }}
              >
                <i className="ri-user-line"></i>{" "}
                {isWalletConnected === true && <span>{username}</span>}
              </Button>
              <Button onClick={() => handleLogout()}>
                <i className="ri-logout-box-line"></i>
                Logout
              </Button>
            </>
          )}
        </div>

        <div className="drawer">
          <div onClick={toggleDrawer("right", true)}>
            <i className="ri-menu-3-line"></i>
          </div>
          <Drawer
            anchor={"right"}
            open={navSMState["right"]}
            onClose={toggleDrawer("right", false)}
            // style={{ backgroundColor: "#1c1b1b" }}
          >
            {list("right")}
          </Drawer>
        </div>
      </div>
    </>
  );
}
