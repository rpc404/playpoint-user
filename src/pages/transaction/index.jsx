import React from "react";
import "./styles/style.css";
import { Tabs, Tab } from "@mui/material";
import { TabPanel, a11yProps } from "../../components/TabPanel";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
  },
};
import { faker } from "@faker-js/faker";

const labels = ["January", "February", "March"];

export const data = {
  labels,
  datasets: [
    {
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export default function Transaction() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="transaction__wrapper">
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
              <i className="ri-notification-3-line"></i>
            </div>
          </div>
          <div className="links">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="History" {...a11yProps(0)} sx={{ color: "#000" }} />
              <Tab label="Upcoming" {...a11yProps(1)} />
            </Tabs>
          </div>

          <TabPanel value={value} index={0}>
            <div className="statement">
              <div className="latest">
                <p>19 Dec, 2022 </p>
                <div className="details">
                  <div className="left">
                    <div className="left_top">
                      <i className="ri-arrow-left-right-line"></i>
                      <h3>Playpoint Support</h3>
                    </div>
                    <div className="left_buttom">
                      <p>9 Dec, 2022 at 7:08 PM</p>
                    </div>
                  </div>

                  <p className="success">Success</p>
                  <div className="right">
                    <i className="ri-link-m"></i>
                    <h3>-$2,430.50</h3>
                  </div>
                </div>
                <div className="details">
                  <div className="left">
                    <div className="left_top">
                      <i className="ri-arrow-left-right-line"></i>
                      <h3>Playpoint Support</h3>
                    </div>
                    <div className="left_buttom">
                      <p>9 Dec, 2022 at 7:08 PM</p>
                    </div>
                  </div>

                  <p className="success">Success</p>
                  <div className="right">
                    <i className="ri-link-m"></i>
                    <h3>-$2,430.50</h3>
                  </div>
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
                      <h3>Playpoint Support</h3>
                    </div>
                    <div className="left_buttom">
                      <p>2 Dec, 2022 at 8:08 PM</p>
                    </div>
                  </div>

                  <p className="success">Success</p>
                  <div className="right">
                    <i className="ri-link-m"></i>
                    <h3>-$2,430.50</h3>
                  </div>
                </div>
                <div className="details">
                  <div className="left">
                    <div className="left_top">
                      <i className="ri-arrow-left-right-line"></i>
                      <h3>Playpoint Support</h3>
                    </div>
                    <div className="left_buttom">
                      <p>2 Dec, 2022 at 8:08 PM</p>
                    </div>
                  </div>

                  <p className="success">Success</p>
                  <div className="right">
                    <i className="ri-link-m"></i>
                    <h3>+$2,430.50</h3>
                  </div>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            UpComing
          </TabPanel>
        </div>
        <div className="balance__container">
          <div className="top">
            <img
              src="https://ik.imagekit.io/domsan/Logo_0vBSw9piY.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1662803005580"
              alt=""
            />
            <h3>Playpoint Support</h3>
            <div className="mid">
              <h2>-$2,430.50</h2>
              <p>19 Dec, 2022 at 7:08 PM</p>
            </div>
            <div className="invoice">
              <div className="balance">
                <p>Balance</p>
                <div className="amount">
                  <i className="ri-wallet-line"></i>
                  <h4>$69,999</h4>
                </div>
              </div>
              <div className="balance">
                <p>Invoice</p>
                <div className="amount">
                  <i className="ri-booklet-line"></i>
                  <h4>8HXR-HA4A-RAG3</h4>
                </div>
              </div>
            </div>
            <div className="chart">
              <Bar options={options} data={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
