import React from "react";
import { useMarketplaceContext } from "../../contexts/Marketplace/MarketplaceContext";
import { getMarketplaces } from "../../api/Marketplace";
import { ACTIONS } from "../../contexts/Marketplace/MarketplaceReducer";
import Fuse from "fuse.js";
import "./styles/style.css";
import MarketplaceItems from "../../components/MarketplaceItems";
import { useLocation } from "react-router-dom";

const MarketPlace = () => {
  const [{ marketplaces }, dispatchMarketplaceData] = useMarketplaceContext();
  const [loading, setLoading] = React.useState(true);
  const [searchFixture, setSearchedFixture] = React.useState(marketplaces);

  const location = useLocation();

  const handleSearch = (query) => {
    if (!query) {
      setSearchedFixture(marketplaces);
      return;
    } else {
      const fuse = new Fuse(marketplaces, {
        keys: ["marketplaceName", "marketplaceSlug"],
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
  const controller = new AbortController();
  React.useEffect(() => {
    (async () => {
      if (marketplaces.length === 0) {
        let res = await getMarketplaces(controller);
        res = res.data.marketplaces;
        setSearchedFixture(res);

        dispatchMarketplaceData({
          type: ACTIONS.SET_ALL_MARKETPLACE,
          payload: res,
        });
      }
      setLoading(false);
    })();
    return () => {
      controller.abort();
    };
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
      <MarketplaceItems
        marketplaces={marketplaces}
        loading={loading}
        {...(location.pathname === "/marketplace" && { searchFixture })}
      />
    </div>
  );
};

export default MarketPlace;
