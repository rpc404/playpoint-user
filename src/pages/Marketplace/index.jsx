import React from "react";
import MarketplaceCard from "../../components/MarketplaceCard";
import { useMarketplaceContext } from "../../contexts/Marketplace/MarketplaceContext";
import { getMarketplaces, getMarketplaceStat } from "../../api/Marketplace";
import { ACTIONS } from "../../contexts/Marketplace/MarketplaceReducer";
import { Skeleton, Stack } from "@mui/material";
import Fuse from "fuse.js";
// import "./styles/style.css";
import "../../dest/pages/Marketplace/styles/style.css"

const MarketPlace = () => {
  const [{ marketplaces }, dispatchMarketplaceData] = useMarketplaceContext();
  const [loading, setLoading] = React.useState(true);
  const [searchFixture, setSearchedFixture] = React.useState(marketplaces);

  const handleSearch = (query) => {
    if (!query) {
      setSearchedFixture(marketplaces);
      return;
    } else {
      const fuse = new Fuse(marketplaces, {
        keys: [
          "marketplaceName",
          "marketplaceSlug",
        ],
        includeScore: true,
      });
      const results = fuse.search(query);
      const finalResult = [];
      if (results.length) {
        results.forEach((result) => {
          finalResult.push(result.item);
        });
        setSearchedFixture(finalResult);
      } else {
        setSearchedFixture([]);
      }
    }
  };

  React.useEffect(() => {
    (async () => {
      if (marketplaces.length === 0) {
        let res = await getMarketplaces();
        res = res.data.marketplaces;
        setSearchedFixture(res);

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
        <div className="search__container">
          <i className="ri-search-line icon"></i>
          <input
            type="input"
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search Marketplaces..."
          />
        </div>
      </div>
      <div className="marketplace__items">
        {marketplaces &&
        marketplaces.length >= 1 &&
        !loading &&
        searchFixture &&
        searchFixture.length >= 1 ? (
          searchFixture.map((marketplace, index) => {
            return (
              <MarketplaceCard
                marketplace={marketplace}
                key={index}
                query={searchFixture}
              />
            );
          })
        ) : (
          <div id="skeleton__container" className="skeleton__container">
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
