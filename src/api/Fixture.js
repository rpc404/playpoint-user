import axios from "axios";

export const getFixtures = async (marketplaceSlug) => {
    var fixtures = await axios.get(
      import.meta.env.VITE_API_URI + `api/v1/fixture-marketplace/?marketplaceSlug=${marketplaceSlug}`
    );
  
    return fixtures;
  };