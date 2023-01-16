import React from "react";
import { Skeleton, Stack } from "@mui/material";
import "./styles/style.css";
import "../../components/MarketplaceItems/styles/style.css";
import MarketplaceCard from "../../components/MarketplaceCard";
import { getMarketplaces } from "../../api/Marketplace";
import { useMarketplaceContext } from "../../contexts/Marketplace/MarketplaceContext";
import { ACTIONS } from "../../contexts/Marketplace/MarketplaceReducer";
import LeaderboardMain from "../../components/LeaderboardMain";
import Hero from "../../components/Hero";
import { Helmet } from "react-helmet";
import Marquee from "react-fast-marquee";

export default function Home() {
  const [{ marketplaces }, dispatchMarketplaceData] = useMarketplaceContext();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      if (marketplaces.length === 0) {
        let res = await getMarketplaces();
        res = res.data.marketplaces;
        dispatchMarketplaceData({
          type: ACTIONS.SET_ALL_MARKETPLACE,
          payload: res,
        });
      }
      setLoading(false);
    })();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="home__container">
      <Helmet>
        <title>Playpoint | Prediction Pool Platform</title>
      </Helmet>

      {window.innerWidth > 992 && (
        <div>
          <Hero />
        </div>
      )}

      <h1 className="home__mainTitle">Active Marketplaces</h1>
      <div className="marketplace__items" id="marketplace__items">
        {marketplaces && marketplaces.length >= 1 && !loading ? (
          marketplaces.map((marketplace, index) => {
            if (!marketplace.closed)
              return (
                <MarketplaceCard
                  marketplace={marketplace}
                  key={index}
                  totalFixtures={marketplace.fixtures.length}
                  totalPredictions={marketplace.prediction.length}
                />
              );
          })
        ) : (
          <div className="skeleton__container">
            {[0, 1, 2, 3, 4].map((data) => {
              return (
                <Stack key={data}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    // width={window.innerWidth < 576 ? "80vw" : "17vw"}
                    height={"16vh"}
                    className="skeleton"
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Skeleton width={280} height={40} />
                    <Skeleton width={70} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {[0, 1, 2, 3].map((data) => {
                      return <Skeleton width={50} height={40} key={data} />;
                    })}
                  </div>
                </Stack>
              );
            })}
          </div>
        )}
      </div>

      <Marquee speed={70}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((d) => {
          return (
            <>
              <h1>Predict to Earn</h1>
              <h1> ❄️ </h1>
            </>
          );
        })}
      </Marquee>
      <LeaderboardMain />
    </div>
  );
}
