import axios from "axios";

export const getMarketplaces = async () => {
  var marketplaces = await axios.get(
    import.meta.env.VITE_API_URI + "api/v1/marketplace"
  );

  return marketplaces;
};

var data = JSON.stringify({
  collection: "marketplaces",
  database: "test",
  dataSource: "v1-playpoint-ai",
  // projection: {
  //   _id: 1,
  // },
});

var config = {
  method: "get",
  url: "https://data.mongodb-api.com/app/data-etphn/endpoint/data/v1/action/find",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Request-Headers": "*",
    "api-key":
      "dZdSJELTyPlByzaDXxlOpc8abwKWgTiLBz0Gpbw9DDAJmWaHCSPPKPwC3M5snKfU",
  },
  data: data,
};

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
