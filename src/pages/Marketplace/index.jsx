import React from "react";
import MarketplaceCard from "../../components/MarketplaceCard";
import { useMarketplaceContext } from "../../contexts/Marketplace/MarketplaceContext";
import { getMarketplaces, getMarketplaceStat } from "../../api/Marketplace";
import { ACTIONS } from "../../contexts/Marketplace/MarketplaceReducer";
import { Skeleton, Stack } from "@mui/material";
import Fuse from "fuse.js";
import "./styles/style.css";

const MarketPlace = () => {
  const [{ marketplaces }, dispatchMarketplaceData] = useMarketplaceContext();
  const [loading, setLoading] = React.useState(true);
  const [query, setQuery] = React.useState("");

  const fuse = new Fuse(marketplaces, {
    keys: ["marketplaceName"],
  });

  // const results = fuse.search(query);
  // const fixtureName = results.map((result) => result.item.marketplaceName);


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
  }, []);

  return (
    <div className="marketplace__container">
      <div className="searchfield">
        <input
          type="text"
          placeholder="search marketplace"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="marketplace__items">
        {marketplaces && marketplaces.length >= 1 && !loading ? (
          marketplaces.map((marketplace, index) => {
            return <MarketplaceCard marketplace={marketplace} key={index} />;
          })
        ) : (
          <div id="skeleton__container">
            {[0, 1, 2, 3, 4].map((skeleton) => {
              return (
                <Stack key={skeleton} className="stack">
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    height={"16vh"}
                    className={"skeleton"}
                  />
                  <Skeleton width={150} height={30} />
                  <div className="inner__skeletons">
                    {[0, 1, 2].map((skeleton) => {
                      return <Skeleton width={40} height={40} key={skeleton} />;
                    })}
                  </div>
                </Stack>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketPlace;
