import axios from "axios";

export const getMarketplaces = async () => {
  var marketplaces = await axios.get(
    import.meta.env.VITE_API_URI + "api/v1/marketplace"
  );
  return marketplaces;
};

export const getMarketplaceStat = async (slug) => {
  var marketplaces = await axios.get(
    import.meta.env.VITE_API_URI + `api/v1/marketplace-stats/${slug}`
  );

  return marketplaces;
};
