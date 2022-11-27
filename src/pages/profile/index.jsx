import React, { useState } from "react";
import "./styles/style.css";
import { Button } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Helmet } from "react-helmet";
import { getUserPredictions } from "../../api/Prediction";
import moment from "moment";
import { useRPCContext } from "../../contexts/WalletRPC/RPCContext";
import { ACTIONS } from "../../contexts/WalletRPC/RPCReducer";
import { setProfile } from "../../api/Profile";
import { toast } from "react-toastify";

export default function Profile() {
  const [userProfile, setUserProfile] = React.useState([]);
  const [history, setHistory] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const [{ userPublicAddress, username, userPPTTBalance }, dispatchRPCData] = useRPCContext();
  const [_username, setUsername] = useState("");

  React.useEffect(() => {
    if (userPublicAddress) {
      getUserPredictions(userPublicAddress).then((res) => {
        if (res.data.data) {
          setUserProfile(res.data.data);
          setHistory(res.data.data.slice(0, 10));
        }
      });
    }
    if (username) {
      setUsername(username);
    }
  }, []);

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
    const page = ev.target.innerHTML.split("<span")[0];
    setHistory(userProfile.slice((page - 1) * 10, page * 10));
  };
  return (
    <div className="profile__container">
      <Helmet>
        <title>Profile | Playpoint</title>
      </Helmet>
      <div className="blob1"></div>

      <div className="userData__container">
        <div className="userData">
          <img
            src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80"
            alt=""
            loading="lazy"
          />
          <div className="userdetails__container">
            {editMode ? (
              <div className="userdetails">
                <fieldset>
                  <input
                    value={_username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={username}
                  />
                  <Button onClick={() => handleUpdate()}>
                    <i className="ri-send-plane-fill"></i>
                  </Button>
                </fieldset>
              </div>
            ) : (
              <div className="userdetails">
                <fieldset>
                  <h2>@{username}</h2>
                  <Button onClick={() => setEditMode(!editMode)}>
                    <i className="ri-pencil-fill"></i>
                  </Button>
                </fieldset>
              </div>
            )}
          </div>
          <p
            className="accountbtn"
            data-title="Copy to Clipboard"
            onClick={() => {
              navigator.clipboard.writeText(userPublicAddress),
                toast("Account number copied!");
            }}
          >
            <p>
              {`${userPublicAddress}`.substring(0, 15) +
                `...` +
                `${userPublicAddress}`.substring(
                  userPublicAddress.length - 3
                )}{" "}
              <i className="ri-file-copy-line"></i>
            </p>
            {/* <p className="copy">Copy to clipboard</p> */}
          </p>
        </div>
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
              <h3>{userPPTTBalance} PPTT</h3>
            </div>
          </div>
        </div>
        <Button className="addMoneyBtn">
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
