import axios from "axios";

export const getLeaderboardByMarketplaceSlug = async (marketplaceSlug) => {
  return await axios.get(
    import.meta.env.VITE_API_URI + "api/v1/leaderboards/" + marketplaceSlug
  );
};

export const getAllLeaderboards = async () => {
  return await axios.get(import.meta.env.VITE_API_URI + "api/v1/leaderboards");
}
