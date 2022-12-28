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
import { useNavigate } from "react-router-dom";
import "./styles/style.css";
import { useRPCContext } from "../../contexts/WalletRPC/RPCContext";
import { ACTIONS } from "../../contexts/WalletRPC/RPCReducer";
import { handleRPCWalletLogin } from "../../utils/RPC";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import ERC20BasicAPI from "../../utils/ERC20BasicABI.json";

export default function Navbar() {
  const navigate = useNavigate();
  const [{ isWalletConnected, username, userPublicAddress }, dispatchRPCData] =
    useRPCContext();
  const [balance, setBalance] = React.useState({
    ethBalance: 0,
    ppttBalance: 0,
  });
  const [loading, setLoading] = React.useState(false);

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

  /**
   * @dev User wallet authentication
   */
  const handleLogin = async () => {
    setLoading(true);
    const resData = await handleRPCWalletLogin();
    const provider = new ethers.providers.Web3Provider(ethereum);
    const contract = new ethers.Contract(
      "0x53d168578974822bCAa95106C7d5a906BF100948",
      ERC20BasicAPI,
      provider
    );

    const ethBalance = await provider.getBalance(resData.userPublicAddress);
    const PPTTBalance = await contract.balanceOf(resData.userPublicAddress);

    const data = {
      ...resData,
      userPPTTBalance: ethers.utils.formatEther(PPTTBalance),
      userETHBalance: ethers.utils.formatEther(ethBalance),
    };

    localStorage.setItem("rpcUserData", JSON.stringify(resData));

    await dispatchRPCData({ type: ACTIONS.WALLET_CONNECT, payload: data });
    toast("Wallet Connected!");
    setLoading(false);
  };

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
                <p
                  className="accountbtn"
                  onClick={() => {
                    navigator.clipboard.writeText(userPublicAddress),
                      toast("Account number copied!");
                  }}
                >
                  {`${userPublicAddress}`.substring(0, 15) +
                    `...` +
                    `${userPublicAddress}`.substring(
                      userPublicAddress.length - 3
                    )}{" "}
                  <i className="ri-file-copy-line"></i>
                </p>
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
                  <i className="ri-add-box-line"></i> Add Money
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
      {!isWalletConnected ? (
        <List>
          <ListItem
            disabled={loading}
            disablePadding
            onClick={() => handleLogin()}
          >
            <ListItemButton className="drawerListItem">
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
        <div
          onClick={(e) => {
            e.stopPropagation();
            navigate("/");
          }}
          className="logo__container"
        >
          <img src="https://ik.imagekit.io/domsan/Logo_0vBSw9piY.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1662803005580" />
          <h3>Playpoint</h3>

          <div className="navLinks">
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
          </div>
        </div>

        <div className="navbar__authentication">
          <button
            onClick={() => window.open("https://app.playpoint.ai/")}
            className="buyButton"
          >
            <i className="ri-coin-fill"></i> Buy PPTT
          </button>
          {isWalletConnected === false ? (
            <Button disabled={loading} onClick={() => handleLogin()}>
              👛 Connect Wallet
            </Button>
          ) : (
            <>
              <div
                className="balance"
                onClick={(e) => {
                  e.stopPropagation();
                  ethereum
                    .request({
                      method: "wallet_watchAsset",
                      params: {
                        type: "ERC20",
                        options: {
                          address: "0x53d168578974822bCAa95106C7d5a906BF100948",
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
                }}
              >
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
                <i className="ri-logout-box-line"></i> Logout
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
      <div className="divider"></div>
    </>
  );
}
