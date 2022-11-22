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

export default function Navbar() {
  const navigate = useNavigate();
  const [{ userPublicAddress, isWalletConnected, username }, dispatchRPCData] =
    useRPCContext();

  /**
   * @dev User wallet authentication
   */
  const handleLogin = async () => {
    const data = await handleRPCWalletLogin();
    await dispatchRPCData({ type: ACTIONS.WALLET_CONNECT, payload: data });
    toast("Wallet Connected!");
  };

  const handleLogout = () =>
    {dispatchRPCData({ type: ACTIONS.WALLET_DISCONNECT });
    toast.error("Wallet Disconnected!");
  }

  /**
   * @dev NavbarSM Devices drawer utils
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
        <List>
          <ListItem disablePadding onClick={() => navigate("/profile")}>
            <ListItemButton className="drawerListItem">
              <i className="ri-user-line"></i>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
        </List>
      )}
      <List>
        <ListItem disablePadding>
          <ListItemButton className="drawerListItem">
            <i className="ri-bar-chart-grouped-line"></i>
            <ListItemText primary="Leaderboards" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton className="drawerListItem">
            <i className="ri-football-line"></i>
            <ListItemText primary="Marketplaces" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <Divider />
      {!isWalletConnected ? (
        <List>
          <ListItem disablePadding onClick={() => handleLogin()}>
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
        {isWalletConnected === false ? (
          <Button onClick={() => handleLogin()}>
            <i className="ri-fingerprint-line"></i> Login / Register
          </Button>
        ) : (
          <>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/profile");
              }}
            >
              <i className="ri-user-line"></i>{" "}
              {/* {isWalletConnected === true &&
                userPublicAddress.substring(0, 12) +
                  "..." +
                  userPublicAddress.slice(-8)} */}
                  {isWalletConnected===true && <span>{username}</span>}
            </Button>
            <Button onClick={() => handleLogout()}>
              <i className="ri-logout-box-line"></i> Logout
            </Button>
          </>
        )}
      </div>

      {window.innerWidth < 576 && (
        <div className="drawer">
          <div onClick={toggleDrawer("right", true)}>
            <i className="ri-menu-3-line"></i>
          </div>
          <Drawer
            anchor={"right"}
            open={navSMState["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </div>
      )}
    </div>
  );
}
