import React from "react";
import { Skeleton, Stack } from "@mui/material";
import "./styles/style.css";
import MarketplaceCard from "../../components/MarketplaceCard";
import { getMarketplaces, getMarketplaceStat } from "../../api/Marketplace";
import { useMarketplaceContext } from "../../contexts/Marketplace/MarketplaceContext";
import { ACTIONS } from "../../contexts/Marketplace/MarketplaceReducer";
import LeaderboardMain from "../../components/LeaderboardMain";
import Hero from "../../components/Hero";

export default function Home() {
  const [{ marketplaces }, dispatchMarketplaceData] = useMarketplaceContext();
  const [loading, setLoading] = React.useState(true);
  console.log(marketplaces);

  React.useEffect(() => {
    (async () => {
      if (marketplaces.length === 0) {
        let res = await getMarketplaces();
        res = res.data.marketplaces;

        dispatchMarketplaceData({
          type: ACTIONS.SET_ALL_MARKETPLACE,
          payload: res,
        });
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="home__container">
      <div className="divider"></div>
      <Hero />
      <h1 className="home__mainTitle">Active Marketplaces</h1>
      <div className="marketplace__items">
        {marketplaces && marketplaces.length >= 1 && !loading ? (
          marketplaces.map((marketplace, index) => {
            return <MarketplaceCard marketplace={marketplace} key={index} />;
          })
        ) : (
          <div className="skeleton__container">
            {[0, 1, 2, 3, 4].map((data) => {
              return (
                <Stack key={data}>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    // width={window.innerWidth < 576 ? "80vw" : "17vw"}
                    height={"16vh"}
                    className="skeleton"
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
          </div>
        )}
      </div>
      <div className="divider"></div>

      {/* <div className="marketingBanners__container">
        <h1>Explore endless possibilities with Playpoint.</h1>
        <div className="marketingBanners__items">
          <div className="marketingBanners__item">
            <img
              src="https://img.freepik.com/free-vector/employee-working-office-interior-workplace-flat-vector-illustration_1150-37453.jpg?w=826&t=st=1664647893~exp=1664648493~hmac=1edcd93a5a19f365559dda8959dfe3f9b3b4805d94aff0db6d38eb2c13e07f67"
              alt=""
            />
            <h2>SELECT THE POOL </h2>
            <p>
              Select the Pool of League you would want to predict in. <br />
              Click on quick view of the match you want to play and predict.{" "}
              <br />
              Select the desirable Wager Stakes per unit entry options.
            </p>{" "}
          </div>
          <div className="marketingBanners__item">
            <h2>MAKE YOUR PREDICTION</h2>
            <p>
              Answer the four questions. <br />
              Each questions have been marked points.
              <br />
              Once the match kicks off the predict closes.
            </p>
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/future-prediction-by-employer-4252956-3526673.png"
              style={{ scale: "1" }}
              alt=""
            />
          </div>
          <div className="marketingBanners__item">
            <img
              src="https://img.freepik.com/premium-vector/money-growth-success-progress-report-vector-illustration-calculating-measuring-company-sales-improvement-statistics_610956-1547.jpg?w=2000"
              alt=""
            />
            <h2>HIGHEST POINT WINS</h2>
            <p>
              After systematic scores computational procedures, the winners are
              determined and sweepstakes are awarded in accordance.
            </p>
          </div>
        </div>
      </div> */}

      <LeaderboardMain />
      <div className="divider"></div>
      <div className="footer__container">
        <div className="footer">
          <div className="playpoint">
            <div className="intro">
              <img
                src="https://ik.imagekit.io/domsan/Logo_0vBSw9piY.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1662803005580"
                alt=""
              />

              <h1>Playpoint</h1>
            </div>
          </div>

          <div className="links">
            <a href="#">Marketplaces</a>
            <a href="#">Fixtures</a>
            <a href="#">Wallet</a>
            <a href="#">Launch App</a>
          </div>
          <div className="social">
            <div className="text">
              <p>Connect with us at :</p>
            </div>
            <div className="icons">
              <a href="#">
                <i class="ri-github-fill"></i>
              </a>
              <a href="#">
                <i class="ri-discord-fill"></i>
              </a>
              <a href="#">
                <i class="ri-telegram-fill"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* <footer>
        <p>
          Copyright © 2023 PPTT. All rights reserved.
          <br />
          Proudly powered by{" "}
          <a href="https://theboringschool.org/" target="_blank">
            The Boring School
          </a>{" "}
          & Supported by{" "}
          <a href="https://codewithsudeep.com/" target="_blank">
            CodewithSudeep
          </a>
          .
        </p>
      </footer>
      <div className="divider"></div> */}
    </div>
  );
}
