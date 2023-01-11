import { Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import moment from "moment/moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getAllChallenge } from "../../api/Challenge";
import { useRPCContext } from "../../contexts/WalletRPC/RPCContext";
import GetFlags from "../../utils/GetFlags";
import "./styles/style.css";

const Challenges = () => {
  const [_challenges, setChalleneges] = React.useState([]);
  const [prop, setActiveProp] = React.useState("");
  const [temp, setTemp] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  // const { HomeTeamFlag } = GetFlags;
  const navigate = useNavigate();
  const [{ userPublicAddress, username, isWalletConnected }, dispatchRPCData] =
    useRPCContext();

  React.useEffect(() => {
    (async () => {
      const data = await getAllChallenge();
      setChalleneges(data.data.reverse());
      setLoading(false);
    })();
  }, []);

  React.useEffect(() => {
    if (_challenges.length > 0) {
      setTemp(_challenges);
    }
  }, [_challenges]);

  React.useEffect(() => {
    let _temp = [];
    if (prop == "all") {
      setTemp(_challenges);
    }
    if (prop == "duo") {
      _temp = _challenges.filter((_challenge) => _challenge.type == "duo");
      setTemp(_temp);
    }
    if (prop == "trio") {
      _temp = _challenges.filter((_challenge) => _challenge.type == "trio");
      setTemp(_temp);
    }
    if (prop == "filled") {
      _temp = _challenges.filter(
        (_challenge) => _challenge.slot == _challenge.participants.length
      );
      setTemp(_temp);
    }
    if (prop == "unfilled") {
      _temp = _challenges.filter(
        (_challenge) => _challenge.slot > _challenge.participants.length
      );
      setTemp(_temp);
    }
    if (prop == "my") {
      _temp = _challenges.filter(
        (_challenge) => _challenge.owner.walletID == userPublicAddress
      );
      setTemp(_temp);
    }
  }, [prop]);

  return (
    <div className="challenges__Container">
      <div className="challenges__AllChallenges">
        <div className="filters">
          <button onClick={() => setActiveProp("all")}>All</button>
          <button onClick={() => setActiveProp("duo")}>Duo</button>
          <button onClick={() => setActiveProp("trio")}>Trio</button>
          <button onClick={() => setActiveProp("filled")}>Filled</button>
          <button onClick={() => setActiveProp("unfilled")}>Unfilled</button>
          {isWalletConnected && (
            <button onClick={() => setActiveProp("my")}>My Challenges</button>
          )}
        </div>
        <div className="cardContainer">
          {!loading && temp.length > 0
            ? temp.map((challenge, key) => {
                return (
                  <div
                    key={key}
                    className="card"
                    onClick={() =>
                      navigate(`/prediction/${challenge.predictionId._id}`)
                    }
                  >
                    <div className="cardHeader">
                      {loading ? (
                        <>
                          <Skeleton animation="wave" width={150} height={50} />
                          <Skeleton animation="wave" width={100} height={50} />
                        </>
                      ) : (
                        <>
                          <h2>ID: #{challenge._id.slice(5, 10)}</h2>
                          <span className={challenge.type}>
                            {challenge.type}
                          </span>
                        </>
                      )}
                    </div>

                    <div className="predictedBy">
                      <img
                        src={`https://robohash.org/${
                          challenge.owner.username || "_0"
                        }`}
                        loading="lazy"
                      />
                      <p className="pp__flex1">{challenge.owner.username}</p>
                      <p>
                        <em>owner</em>
                      </p>
                    </div>
                    <div className="fixture">
                      <p>
                        {GetFlags(
                          challenge.fixtureId.marketplaceSlug,
                          challenge.fixtureId.HomeTeam
                        )}
                        {challenge.fixtureId.HomeTeam}
                      </p>

                      <p>{" - "}</p>
                      <p>
                        {GetFlags(
                          challenge.fixtureId.marketplaceSlug,
                          challenge.fixtureId.AwayTeam
                        )}
                        {challenge.fixtureId.AwayTeam}
                      </p>
                    </div>
                    <div className="stat">
                      <p className="amount">{challenge.amount / 0.02}PPTT</p>

                      <p className="filled">
                        {challenge.participants.length} of {challenge.slot}{" "}
                        Slots
                      </p>
                    </div>

                    <p>{moment(challenge.created_at).fromNow()}</p>
                  </div>
                );
              })
            : [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((challenge, index) => {
                return (
                  <div className="card" key={index}>
                    <div className="card__header">
                      <Skeleton width={150} height={50} />
                      <Skeleton width={100} height={50} />
                    </div>
                    <div>
                      <div className="card_image">
                        <div>
                          <Skeleton
                            animation="wave"
                            variant="circular"
                            width={30}
                            height={30}
                          />
                          <Skeleton width={70} height={50} />
                        </div>
                        <Skeleton width={50} height={50} />
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "5px",
                      }}
                    >
                      <Skeleton width={30} height={50} />
                      <Skeleton width={60} height={50} />
                      -
                      <Skeleton width={30} height={50} />
                      <Skeleton width={60} height={50} />
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Skeleton width={90} height={50} />
                      <Skeleton width={60} height={50} />
                    </div>
                    <Skeleton width={70} height={50} />
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default Challenges;
