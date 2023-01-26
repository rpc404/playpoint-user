import React from "react";
import "./styles/style.css";
import "../../components/MarketplaceItems/styles/style.css";
import LeaderboardMain from "../../components/LeaderboardMain";
import Hero from "../../components/Hero";
import { Helmet } from "react-helmet";
import Marquee from "react-fast-marquee";
import useWindowDimensions from "../../helpers/UseWindowDimension";
import MarketplaceItems from "../../components/MarketplaceItems";
import { useTranslation } from "react-i18next";
import { useMarketplaceContext } from "../../contexts/Marketplace/MarketplaceContext";
import { getMarketplaces } from "../../api/Marketplace";
import { ACTIONS } from "../../contexts/Marketplace/MarketplaceReducer";
import { useQuery } from "react-query";

export default function Home() {
  const [{ marketplaces }, dispatchMarketplaceData] = useMarketplaceContext();

  const [loading, setLoading] = React.useState(true);

  const { t } = useTranslation();

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

  // const { isLoading, error, data } = useQuery(
  //   "getMarketplaces",
  //   () =>
  //     getMarketplaces().then((res) => {
  //       res = res.data.marketplaces;

  //       dispatchMarketplaceData({
  //         type: ACTIONS.SET_ALL_MARKETPLACE,
  //         payload: res,
  //       });
  //     }),
  //   {
  //     retry: false,
  //     refetchOnWindowFocus: false,
  //   }
  // );

  const { width } = useWindowDimensions();
  return (
    <div className="home__container">
      <Helmet>
        <title>{t("HemletTitle")}</title>
      </Helmet>

      {width > 992 && (
        <div>
          <Hero />
        </div>
      )}

      <h1 className="home__mainTitle">{t("ActiveMarketplaces")}</h1>
      <MarketplaceItems marketplaces={marketplaces} loading={loading} />

      <Marquee speed={70}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((d) => {
          return (
            <div key={d} className="marquee-item">
              <h1>{t("PredicttoEarn")}</h1>
              <h1> ❄️ </h1>
            </div>
          );
        })}
      </Marquee>
      <LeaderboardMain />
    </div>
  );
}
