import React from "react";
import "./styles/style.css";
import { getCountryShortName } from "../Leaderboards/Leaderboards";
import moment from "moment/moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

/**
 *  @ReactChart
 */
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive:true,
  plugins: {
    legend: {
      position: "top",
      display: false,
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
    maintainAspectRatio: false,
  },
};

const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      tension: 0.4,
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(86,205,243,1)",
    },
    {
      label: "Dataset 2",
      tension: 0.4,
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "#EA5756",
    },
  ],
};

/**
 * @dev Border linear progress bar
 */
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const ProfileComponent = ({ username, balance, results, woat }) => {
  return (
    <div className="profile__tab">
      <div className="profile__box">
        <div className="username">
          <h3>
            Hello,<span>{username}</span>
          </h3>
          <p>Today is {moment().format("MMMM Do YYYY")} </p>
        </div>
        <div className="profleimage_box">
          <p className="date">{moment().format("LL")}</p>
          <p>
            <i className="ri-search-line"></i>
          </p>
          <p>
            <i className="ri-notification-line"></i>
          </p>
          <img
            src={`https://robohash.org/${username}`}
            alt="robohash_image"
            loading="lazy"
          />
        </div>
      </div>
      <div className="userDetails__container">
        <div className="userDetails">
          <div className="stats">
            <div className="amounts">
              <p>
                <img
                  src="https://ethereum.org/static/4f10d2777b2d14759feb01c65b2765f7/69ce7/eth-glyph-colored.webp"
                  alt="eth_img"
                />
                {parseFloat(balance.ppttBalance).toFixed(2)} PPTT
              </p>
              <p>
                <img
                  src="https://ethereum.org/static/c48a5f760c34dfadcf05a208dab137cc/3a0ba/eth-diamond-rainbow.webp"
                  alt="eth_img"
                />
                {parseFloat(balance.ethBalance).toFixed(2)} ETH
              </p>
            </div>
            <div className="active_challenges">
              5 active <br /> predictions
            </div>
            <div className="total__predictions">
              10 Total <br /> predictions
            </div>
            <div className="pool__pptt">
              <p>
                <i className="ri-money-dollar-circle-line"></i>
              </p>{" "}
              Your money in pool <br />
              500 PPTT
            </div>
            <div className="winnings">
              <p>
                <i className="ri-bar-chart-grouped-line"></i>
              </p>
              Winnings of All Time <br /> {woat} PPTT
            </div>
          </div>
          <div className="statGraph">
            <div className="user_stat">
              <p>
                <i className="ri-bar-chart-fill"></i> PPTT Forecast
              </p>
              <div>
                <p></p>
                <p>This week</p>
                <p></p>
                <p>Last week</p>
              </div>
              <p>
                <i className="ri-more-2-line"></i>
              </p>
            </div>
            <div className="graph">
              <Line options={options} data={data} height={100} />
            </div>
          </div>
          <div className="transaction__stats">
            <div className="transaction__title">
              <h3>Game Status</h3>
              <p>
                Last Month <i className="ri-arrow-drop-down-line"></i>
              </p>
            </div>
            <div className="titles">
              <p>ID</p>
              <p>Points</p>
              <p>Win/Lose Amount</p>
              <p>Match</p>
              <p>Date/Time</p>
              <p>Transaction</p>
            </div>
            <div className="transaction__items">
              {results.map((data, index) => {
                data.result =
                  data.predictionId.amount / 0.02 < data.rewardAmount
                    ? "win"
                    : "lose";
                return (
                  <div className="transaction" key={index}>
                    <p>
                      {data._id.substring(0, 10)}...
                      {data._id.substring(data._id.length - 5)}
                    </p>
                    <p className={data.result}>{data.points || "0"}</p>
                    <p className={data.result}>
                      {data.result === "win" ? (
                        <>
                          {data.rewardAmount} PPTT ~ ${data.rewardAmount * 0.02}
                        </>
                      ) : (
                        <>
                          <>
                            {parseFloat(
                              data.predictionId.amount / 0.02 -
                                data.rewardAmount
                            ).toFixed(2)}{" "}
                            PPTT ~ ${data.predictionId.amount}
                          </>
                        </>
                      )}
                    </p>
                    <p>
                      {" "}
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
                    <p>
                      {" "}
                      <a
                        href={`https://sepolia.etherscan.io/tx/${data.txnhash}`}
                        target="_blank"
                      >
                        View
                      </a>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="notifications__container">
          <div className="notifications">
            <div className="notificationtitle__container">
              <div className="notification__title">
                <p>
                  <i className="ri-notification-line"></i>
                </p>
                <p>Notification</p>
              </div>
              <p>
                <i className="ri-settings-3-line"></i>
              </p>
            </div>
            <div className="notification__wrapper">
              <div className="notification">
                <img src="https://robohash.org/1" alt="user_image" />
                <div>
                  <p>Suraj Gaire predicted 5000 PPTT on Man utd vs Man city </p>
                  <p>1m ago</p>
                </div>
              </div>
              <div className="notification">
                <img src="https://robohash.org/1" alt="user_image" />
                <div>
                  <p>Suraj Gaire predicted 5000 PPTT on Man utd vs Man city </p>
                  <p>1m ago</p>
                </div>
              </div>
              <div className="notification">
                <img src="https://robohash.org/1" alt="user_image" />
                <div>
                  <p>Suraj Gaire predicted 5000 PPTT on Man utd vs Man city </p>
                  <p>1m ago</p>
                </div>
              </div>
              <div className="notification">
                <img src="https://robohash.org/1" alt="user_image" />
                <div>
                  <p>Suraj Gaire predicted 5000 PPTT on Man utd vs Man city </p>
                  <p>1m ago</p>
                </div>
              </div>
              <div className="notification">
                <img src="https://robohash.org/1" alt="user_image" />
                <div>
                  <p>Suraj Gaire predicted 5000 PPTT on Man utd vs Man city </p>
                  <p>1m ago</p>
                </div>
              </div>
              <div className="notification">
                <img src="https://robohash.org/1" alt="user_image" />
                <div>
                  <p>Suraj Gaire predicted 5000 PPTT on Man utd vs Man city </p>
                  <p>1m ago</p>
                </div>
              </div>
              <div className="notification">
                <img src="https://robohash.org/1" alt="user_image" />
                <div>
                  <p>Suraj Gaire predicted 5000 PPTT on Man utd vs Man city </p>
                  <p>1m ago</p>
                </div>
              </div>
            </div>
          </div>
          <div className="application">
            <div className="title">
              <h3>Activity</h3>
              <p>
                <i className="ri-more-2-line"></i>
              </p>
            </div>
            <div className="application_stat">
              <div className="stat_title">
                <p>Total Leave Application</p>
                <p>95/227</p>
              </div>
              <p>88%</p>
              <BorderLinearProgress variant="determinate" value={88} />
            </div>
            <div className="application_stat">
              <div className="stat_title">
                <p>Total Leave Application</p>
                <p>95/227</p>
              </div>
              <p>88%</p>
              <BorderLinearProgress variant="determinate" value={88} />
            </div>
            <div className="application_stat">
              <div className="stat_title">
                <p>Total Leave Application</p>
                <p>95/227</p>
              </div>
              <p>88%</p>
              <BorderLinearProgress variant="determinate" value={88} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
