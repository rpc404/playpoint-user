import React from "react";
import "./styles/style.css";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function Transaction() {
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
            <Typography>{children}</Typography>
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

  return (
    <div className="main__container">
      <div className="wrapper">
        <div className="options__container">
          <div className="profile">
            <img src="https://robohash.org/riktriz" alt="profile image" />
            <h3>Riktriz</h3>
          </div>
          <div className="amount">
            <p>Balance</p>
            <h3>$69,999</h3>
          </div>
          <div className="options">
            <div className="links">
              <i className="ri-arrow-left-right-line"></i>
              Transactions
            </div>
            <div className="links">
              <i className="ri-money-dollar-circle-line"></i>
              Payments
            </div>
            <div className="links">
              <i className="ri-bank-card-2-line"></i>
              Cards
            </div>
            <div className="links">
              <i className="ri-account-circle-line"></i>
              Account
            </div>
            <div className="links">
              <i className="ri-user-settings-line"></i>
              Administration
            </div>
          </div>
        </div>

        <div className="transaction__container">
          <div className="top">
            <h1>Transactions</h1>

            <div className="button">
              <div className="search">
                <input type="text" placeholder="Search.." />
                <i className="ri-search-line"></i>
              </div>
              <a href="#">
                <i className="ri-notification-3-line"></i>
              </a>{" "}
            </div>
          </div>
          <div className="links">
            {/* <a href="#">History</a>
            <a href="#">Upcoming</a> */}
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Item One" {...a11yProps(0)} />
              <Tab label="Item Two" {...a11yProps(1)} />
            </Tabs>
          </div>
          <div className="statement">
            <div className="latest">
              <p>19 Dec, 2022 </p>
              <div className="details">
                <div className="left">
                  <div className="left_top">
                    <i className="ri-arrow-left-right-line"></i>
                    <h3>Amazon Support</h3>
                  </div>
                  <div className="left_buttom">
                    <p>9 Dec, 2022 at 7:08 PM</p>
                  </div>
                </div>

                <p>Success</p>
                <i className="ri-link-m"></i>
                <h3>-$2,430.50</h3>
              </div>
              <div className="details">
                <div className="left">
                  <div className="left_top">
                    <i className="ri-arrow-left-right-line"></i>
                    <h3>Amazon Support</h3>
                  </div>
                  <div className="left_buttom">
                    <p>9 Dec, 2022 at 7:08 PM</p>
                  </div>
                </div>

                <p>Success</p>
                <i className="ri-link-m"></i>
                <h3>-$2,430.50</h3>
              </div>
            </div>
          </div>
          <div className="statement">
            <div className="latest">
              <p>2 Dec, 2022 </p>
              <div className="details">
                <div className="left">
                  <div className="left_top">
                    <i className="ri-arrow-left-right-line"></i>
                    <h3>Amazon Support</h3>
                  </div>
                  <div className="left_buttom">
                    <p>2 Dec, 2022 at 8:08 PM</p>
                  </div>
                </div>

                <p>Success</p>
                <i className="ri-link-m"></i>
                <h3>-$2,430.50</h3>
              </div>
              <div className="details">
                <div className="left">
                  <div className="left_top">
                    <i className="ri-arrow-left-right-line"></i>
                    <h3>Riktriz</h3>
                  </div>
                  <div className="left_buttom">
                    <p>2 Dec, 2022 at 8:08 PM</p>
                  </div>
                </div>

                <p>Success</p>
                <i className="ri-link-m"></i>
                <h3>+$2,430.50</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="balance__container">
          <div className="top">
            <img
              src="https://ik.imagekit.io/domsan/Logo_0vBSw9piY.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1662803005580"
              alt=""
            />
            <h3>Amazon Support</h3>
            <div className="mid">
              <h2>-$2,430.50</h2>
              <p>19 Dec, 2022 at 7:08 PM</p>
            </div>
            <div className="invoice">
              <p>Balance</p>
              <div className="balance">
                <i className="ri-wallet-line"></i>
                <h4>$69,999</h4>
              </div>
              <p>Invoice</p>
              <div className="balance">
                <i className="ri-booklet-line"></i>
                <h4>8HXR-HA4A-RAG3</h4>
              </div>
            </div>
            <div className="chart">
              <img
                src="https://lh6.googleusercontent.com/uHU7F0Eq21xjQgotgkOKjjfJnQ4cf049OkJtM0M6NeajnsWfa3P_zrOSpAvp6ynpOSO8cwzeGDOc0YF-mEK7X7njEUGrvg_1r7tOI0TRPh-AshZ6wP98E0AWbETSBhMruDWp3vta"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
