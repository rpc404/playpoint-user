import axios from "axios";

export const getFixtures = async (marketplaceSlug) => {
  var fixtures = await axios.get(
    import.meta.env.VITE_API_URI +
      `api/v1/fixture-marketplace/${marketplaceSlug}`
  );

  return fixtures;
};

export const getFixutreById = async (fixtureId) => {
  var fixture = await axios.get(
    import.meta.env.VITE_API_URI + `api/v1/fixture-specific/${fixtureId}`
  );

  return fixture;
};
