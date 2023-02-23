import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import "./styles/style.css";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function DrawerList({
  anchor,
  toggleDrawer,
  isWalletConnected,
  username,
  balance,
  handleLogout,
  loading,
  toggleAuthenticationDrawer,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <div className="crossicon__container">
        <p onClick={toggleDrawer(anchor, false)}>
          <i className="ri-close-fill"></i>
        </p>
      </div>
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
                  {"Add Money"}
                </Button>
              </div>
            </ListItem>
          </List>
          <List>
            <ListItem
              disablePadding
              onClick={() => {
                navigate("/profile"), toggleDrawer(anchor, false);
              }}
            >
              <ListItemButton
                className="drawerListItem"
                onClick={toggleDrawer(anchor, false)}
              >
                <i className="ri-user-line"></i>
                <ListItemText primary={`${t("Profile")}`} />
              </ListItemButton>
            </ListItem>
          </List>
        </div>
      )}
      {isWalletConnected && <Divider />}
      <List>
        <ListItem
          disablePadding
          onClick={() => {
            navigate("/leaderboards"), toggleDrawer(anchor, false);
          }}
        >
          <ListItemButton
            className="drawerListItem"
            onClick={toggleDrawer(anchor, false)}
          >
            <i className="ri-bar-chart-grouped-line"></i>
            <ListItemText primary={`${t("Leaderboards")}`} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          disablePadding
          onClick={() => {
            navigate("/marketplace"), toggleDrawer(anchor, false);
          }}
        >
          <ListItemButton
            className="drawerListItem"
            onClick={toggleDrawer(anchor, false)}
          >
            <i className="ri-football-line"></i>
            <ListItemText primary={`${t("Marketplaces")}`} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          disablePadding
          onClick={() => {
            navigate("/challenges"), toggleDrawer(anchor, false);
          }}
        >
          <ListItemButton
            className="drawerListItem"
            onClick={toggleDrawer(anchor, false)}
          >
            <i className="ri-gift-line"></i>
            <ListItemText primary={`${t("Challenges")}`} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem
          disablePadding
          onClick={() => {
            navigate("/discussion"), toggleDrawer(anchor, false);
          }}
        >
          <ListItemButton
            className="drawerListItem"
            onClick={toggleDrawer(anchor, false)}
          >
            <i className="ri-discuss-line"></i>
            <ListItemText primary={`${t("Discussion")}`} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      {!isWalletConnected ? (
        <List>
          <ListItem
            disabled={loading}
            disablePadding
            onClick={toggleDrawer(anchor, false)}
          >
            <ListItemButton
              className="drawerListItem"
              onClick={() => toggleAuthenticationDrawer()}
            >
              <i className="ri-fingerprint-line"></i>
              <ListItemText primary={`${t("Login/Register")}`} />
            </ListItemButton>
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem disablePadding onClick={() => handleLogout()}>
            <ListItemButton
              className="drawerListItem"
              onClick={toggleDrawer(anchor, false)}
            >
              <i className="ri-logout-box-line"></i>
              <ListItemText primary={`${t("Logout")}`} />
            </ListItemButton>
          </ListItem>
        </List>
      )}
      <Divider />
    </Box>
  );
}
