import { Skeleton } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { getMarketplaceStat } from "../../api/Marketplace";
import Pusher from "pusher-js";

export default function MarketplaceCard({ marketplace, query }) {
  const [stat, setStat] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  // console.log(marketplace.marketplaceSlug,stat);

  React.useEffect(() => {
    getMarketplaceStat(marketplace.marketplaceSlug).then((res) =>
      setStat(res.data.response)
    );
    setLoading(false);
  }, []);

  React.useEffect(() => {
    if (query) {
      // setLoading(true);
      getMarketplaceStat(marketplace.marketplaceSlug).then((res) => {
        setStat(res.data.response);
      });
    }
    setLoading(false);
  }, [query]);

  React.useEffect(() => {
    // Enable pusher logging - don't include this in production
    // Pusher.logToConsole = true;
    const pusher = new Pusher("4dd831b4f90804d6ebf4", {
      cluster: "ap2",
    });

    const predictionChannel = pusher.subscribe("prediction-channel");
    predictionChannel.bind("new-prediction", (data) => {
      if (data.data[0].marketplaceSlug == marketplaceSlug) {
        getMarketplaceStat(marketplace.marketplaceSlug).then((res) =>
          setStat(res.data.response)
        );
      }
    });
  }, []);

  const navigate = useNavigate();

  const navHandler = (marketplaceSlug) =>{
        sessionStorage.setItem("marketplaceSlug", marketplaceSlug);
        navigate(`/fixture/${marketplaceSlug}`, {
          state: {
            marketplaceSlug,
          },
        });
  }
  const { marketplaceCoverImage, marketplaceName, marketplaceSlug, closed } =
    marketplace;

  const styles = {
    background: `url(${marketplaceCoverImage?.url}) center /cover no-repeat`,
  };

  return (
    <div
      className="marketplaceCard__container"
      onClick={() => {
        closed ? alert("markeplace closed") :
        navHandler(marketplaceSlug)
      }}
    >
      <div className="coverImage" style={styles}></div>
      <span className="marketplaceDetails">
        <span className="marketplaceName">
          <h4>
            <i className="ri-football-line"></i> {marketplaceName}
          </h4>
        </span>
        {!loading && Object.keys(stat).length >= 1 ? (
          <div className="info">
            {/* <p>
              {stat.totalQuestionaires} <br />
              <span className="flex">
                <i className="ri-chat-poll-line"></i> Questions
              </span>
            </p> */}
            <p>
              {stat.totalFixtures} <br />
              <span className="flex">
                <i className="ri-bubble-chart-line"></i> Fixtures
              </span>
            </p>
            <p>
              {stat.totalPredictions} <br />
              <span className="flex">
                <i className="ri-bar-chart-grouped-line"></i> Total entries
              </span>
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 15px",
            }}
          >
            {[0, 1, 2].map((data) => {
              return <Skeleton width={70} height={30} key={data} />;
            })}
          </div>
        )}
      </span>
    </div>
  );
}
