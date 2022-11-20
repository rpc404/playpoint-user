import React from "react";
import { Skeleton, Stack } from "@mui/material";
import "./styles/style.css";
import MarketplaceCard from "../../components/MarketplaceCard";
import { getMarketplaces } from "../../api/Marketplace";

export default function Home({setActiveFixtureBackground}) {
  const [marketplaceItems, setMarketplaceItems] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const res = await getMarketplaces();
      setMarketplaceItems(res.data.marketplaces.reverse());
    })();
  }, []);

  return (
    <div className="home__container">
      <div className="marketingBanners__container">
        <h1>Explore endless possibilities with Playpoint.</h1>
        <div className="marketingBanners__items">
          <div className="marketingBanners__item">
            <img src="https://img.freepik.com/free-vector/employee-working-office-interior-workplace-flat-vector-illustration_1150-37453.jpg?w=826&t=st=1664647893~exp=1664648493~hmac=1edcd93a5a19f365559dda8959dfe3f9b3b4805d94aff0db6d38eb2c13e07f67" alt="" />
            <h2>SELECT THE POOL </h2>
            <p>
            Select the Pool of League you would want to predict in. <br/>
Click on quick view of the match you want to play and predict. <br/>
Select the desirable Wager Stakes per unit entry options.
              </p> </div>
          <div className="marketingBanners__item">
            <h2>MAKE YOUR PREDICTION</h2>
            <p>
            Answer the four questions. <br/>Each questions have been marked points.<br/>Once the scheduled selected match kicks off the real-time show concludes.
            </p>
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/future-prediction-by-employer-4252956-3526673.png" style={{scale:"1"}} alt="" />
          </div>
          <div className="marketingBanners__item">
            <img src="https://img.freepik.com/premium-vector/money-growth-success-progress-report-vector-illustration-calculating-measuring-company-sales-improvement-statistics_610956-1547.jpg?w=2000" alt="" />
            <h2>HIGHEST POINT WINS</h2>
            <p>After systematic scores computational procedures, the winners are determined and sweepstakes are awarded in accordance.</p>
          </div>
        </div>
      </div>

      <div className="marketplace__items">
        {marketplaceItems.length >= 1 ? (
          marketplaceItems.map((marketplace, index) => {
            return <MarketplaceCard setActiveFixtureBackground={setActiveFixtureBackground} marketplace={marketplace} key={index} />;
          })
        ) : (
          <>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((data) => {
              return (
                <Stack key={data}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    width={window.innerWidth < 576 ? "80vw" :"20vw"}
                    height={"20vh"}
                  />
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Skeleton width={200} height={40} />
                    <Skeleton width={70} />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    {[0, 1, 2, 3].map((data) => {
                      return <Skeleton width={70} height={40} key={data} />;
                    })}
                  </div>
                </Stack>
              );
            })}
          </>
        )}
      </div>

    </div>
  );
}
