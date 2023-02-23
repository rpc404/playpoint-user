import axios from "axios";

export const getMarketplaces = async (controller) => {
  var marketplaces = await axios.get(
    import.meta.env.VITE_API_URI + "api/v1/marketplace",
    { signal: controller.signal }
  );
  return marketplaces;
};

export const getMarketplaceStat = async (slug) => {
  var marketplaces = await axios.get(
    import.meta.env.VITE_API_URI + `api/v1/marketplace-stats/${slug}`
  );

  return marketplaces;
};
