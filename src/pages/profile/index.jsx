import React, { useState } from "react";
import "./styles/style.css";
import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Helmet } from "react-helmet";
// import UserHistory from "../../mocks/UserHistory.json";
import { getUserPredictions } from "../../api/Prediction";
import moment from "moment";
import { useRPCContext } from "../../contexts/WalletRPC/RPCContext";

export default function Profile() {
  const [userProfile, setUserProfile] = React.useState([]);
  const [history, setHistory] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const [{ userPublicAddress, username }, dispatchRPCData] =
    useRPCContext();

  const userID =
    JSON.parse(localStorage.getItem("rpcUserData")).userPublicAddress || "";
  React.useEffect(() => {
    if (userID) {
      getUserPredictions(userID).then((res) => {
        if (res.data.data) {
          setUserProfile(res.data.data);
          setHistory(res.data.data.slice(0, 10));
        }
      });
    }
  }, []);

  const handlePageClick = (ev) => {
    const page = ev.target.innerHTML.split("<span")[0];
    setHistory(userProfile.slice((page - 1) * 10, page * 10));
  };
  return (
    <div className="profile__container">
      <Helmet>
        <title>Profile | Playpoint</title>
      </Helmet>
      <div className="blob1"></div>
      <div className="summary__container">
        <div className="summaryItem">
          <i className="ri-money-dollar-circle-line"></i>
          <div>
            <p>Your money in pool</p>
            <h3>6676.00 PPTT</h3>
          </div>
        </div>
        <div className="summaryItem">
          <i className="ri-bar-chart-grouped-line"></i>
          <div>
            <p>Winnings of all time</p>
            <h3>5896.00 PPTT</h3>
          </div>
        </div>
        <div className="summaryItem">
          <i className="ri-wallet-3-line"></i>
          <div>
            <p>Your balance</p>
            <h3>589658.00 PPTT</h3>
          </div>
        </div>
      </div>

      <div className="userData">
        <img
          src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80"
          alt=""
          loading="lazy"
        />
        <div>
          {editMode ? (
            <div style={{ display: "flex" }}>
              <input value={username} />
              <Button onClick={() => setEditMode(!editMode)}>
                <i class="ri-send-plane-fill"></i>
              </Button>
            </div>
          ) : (
            <div style={{ display: "flex" }}>
              <h2>{username}</h2>
              <Button onClick={() => setEditMode(!editMode)}>
                <i className="ri-pencil-line"></i>
              </Button>
            </div>
          )}
        </div>
        <Button>
          <i className="ri-add-box-line"></i> Add Money
        </Button>
      </div>

      <div className="history__container">
        <div className="titles">
          <p>ID</p>
          <p>Result</p>
          <p>amount</p>
          <p>win/lose amount</p>
          <p>match</p>
          <p>date/time</p>
        </div>

        <div className="history__items">
          {history.map((data, index) => (
            <div className="history__item" key={index}>
              <p>{data._id.substring(4, 15)}</p>
              <p className={data.result}>
                <span>{data.result || "-"}</span>
              </p>
              <p>
                ${data.amount}~{data.amount} PPTT
              </p>
              <p className={data.result}>
                {data.result === "win" || data.result === "lose" ? (
                  <>
                    ${data.resultAmount}~{data.resultAmount * 0.015} PPTT
                  </>
                ) : (
                  <>{"-"}</>
                )}
              </p>
              <p>
                <b>{data?.match?.home || "-"}</b> VS{" "}
                <b>{data?.match?.away || "-"}</b>
              </p>
              <p>{Date(data.created_at)}</p>
            </div>
          ))}
        </div>
      </div>

      <Stack spacing={2}>
        <Pagination
          count={userProfile.length / 10}
          shape="rounded"
          className="pagination"
          onClick={(e) => handlePageClick(e)}
        />
      </Stack>

      <div className="mobhistory_container">
        {history.map((data, i) => {
          return (
            <div className="card" key={i}>
              <div className="id__container">
                <p className="id">
                  ID: <em>{data._id.substring(4, 15)}</em>
                </p>
              </div>
              <p className="amount">
                {` Amount: $${data.amount}~${data.amount} PPTT`}
              </p>
              <p className="result">Result:{data.result || "--"}</p>
              <p className="win-lose">
                win/lose amount:{" "}
                {data.result === "win" || data.result === "lose" ? (
                  <>
                    ${data.resultAmount}~{data.resultAmount * 0.015} PPTT
                  </>
                ) : (
                  <>{"-"}</>
                )}
              </p>
              <p className="match">
                Match: <b>{data?.match?.home || "-"}</b> VS{" "}
                <b>{data?.match?.away || "-"}</b>
              </p>
              <p className="date">
                Date:{moment(data?.created_at).format("lll")}
              </p>
              {data.result && (
                <div className="winlose">
                  <p>win/lose</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
