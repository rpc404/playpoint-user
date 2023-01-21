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
import useWindowDimensions from "../../helpers/UseWindowDimension";
import MarketplaceItems from "../../components/MarketplaceItems";

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

  const { width } = useWindowDimensions();
  return (
    <div className="home__container">
      <Helmet>
        <title>Playpoint | Prediction Pool Platform</title>
      </Helmet>

      {width > 992 && (
        <div>
          <Hero />
        </div>
      )}

      <h1 className="home__mainTitle">Active Marketplaces</h1>
      <MarketplaceItems marketplaces={marketplaces} loading={loading} />

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
