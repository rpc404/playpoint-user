import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MarketplaceCard({ marketplace }) {
  const navigate = useNavigate();

  const navHandler = (marketplaceSlug) => {
    sessionStorage.setItem("marketplaceSlug", marketplaceSlug);
    navigate(`/fixture/${marketplaceSlug}`, {
      state: {
        marketplaceSlug,
      },
    });
  };
  const {
    marketplaceCoverImage,
    marketplaceName,
    marketplaceSlug,
    closed,
  } = marketplace;

  const styles = {
    background: `url(${marketplaceCoverImage?.url}) top center /cover no-repeat`,
  };

  return (
    <div
      style={styles}
      className="marketplaceCard__container"
      onClick={() => {
        closed ? toast("Marketplace Closed") : navHandler(marketplaceSlug);
      }}
    >
      <h1>{`${marketplaceName}`}</h1>
    </div>
  );
}
