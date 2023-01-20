import { Skeleton, Stack } from "@mui/material";
import React from "react";
import MarketplaceCard from "../MarketplaceCard";
import "./styles/style.css";

const MarketplaceItems = ({ marketplaces, loading, searchFixture }) => {
  return (
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
                {/* <Skeleton width={150} height={30} /> */}
                {/* <div className="inner__skeletons">
                  {[0, 1, 2].map((skeleton) => {
                    return <Skeleton width={40} height={40} key={skeleton} />;
                  })}
                </div> */}
              </Stack>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MarketplaceItems;
