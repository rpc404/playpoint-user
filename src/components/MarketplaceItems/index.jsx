import { Skeleton, Stack } from "@mui/material";
import React from "react";
import MarketplaceCard from "../MarketplaceCard";
import "./styles/style.css";
import { useLocation } from "react-router-dom";

const MarketplaceItems = ({ marketplaces, loading, searchFixture }) => {
  const location = useLocation();

  const SkeletonContainer = () => {
    return (
      <div id="skeleton__container" className="skeleton__container">
        {[0, 1, 2, 3, 4].map((skeleton) => {
          return (
            <Stack key={skeleton} className="stack">
              <Skeleton
                animation="wave"
                variant="rectangular"
                height={"45vh"}
                className={"skeleton"}
                sx = {{borderRadius:"32px"}}
              />
            </Stack>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={`marketplace__items ${
        location.pathname === "/marketplace" ? "marketplace" : ""
      }`}
    >
      {location.pathname === "/marketplace" ? (
        marketplaces && marketplaces.length >= 1 && !loading ? (
          searchFixture.map((marketplace, index) => {
            return <MarketplaceCard marketplace={marketplace} key={index} />;
          })
        ) : (
          <SkeletonContainer />
        )
      ) : location.pathname === "/" &&
        marketplaces &&
        marketplaces.length >= 1 &&
        !loading ? (
        marketplaces.map((marketplace, index) => {
          if (!marketplace.closed) {
            return <MarketplaceCard marketplace={marketplace} key={index} />;
          }
        })
      ) : (
        <SkeletonContainer />
      )}
    </div>
  );
};

export default MarketplaceItems;
