import React from "react";
import "./styles/style.css";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className="hero__container">
      <div className="blob"></div>
      <div className="blob1"></div>
      <div className="heroIntroduction">
        <div className="heroImage">
          <img
            src="https://ik.imagekit.io/domsan/Screenshot_from_2022-12-27_18-11-33_7RvpCg-AN.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672144045460"
            alt="hero Image"
          />
        </div>
        <div className="heroContent">
          <h1>Predict & Win</h1>
          <div className="card">
            <Typography className="introduction">
              Playpoint is an online platform for{" "}
              <span>predicting sporting events</span>
              using blockchain technology. It includes a marketplace, vendor
              showcase, prediction hub, and various prediction pools.
            </Typography>
            <p className="introduction">
              <span>"Duo"</span> and <span>"trio"</span> pools are new
              prediction pools that involve predicting the{" "}
              <span>outcomes of two or three events</span>, respectively. It's
              not clear how these pools will be structured or how they differ
              from <span>other prediction pools</span> offered by Playpoint.
            </p>
            <div className="actions">
              <div
                className="beginButton"
                tabIndex="0"
                role="button"
                onClick={() => navigate("marketplace")}
              >
                🏁 Predict Now
              </div>

              <a
                target={"_blank"}
                href="https://docs.playpoint.ai/"
                title="docs.playpoint.ai"
              >
                📖 Learn more
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="hero">
        <div className="pptt">
          <img
            src="https://ik.imagekit.io/domsan/Screenshot_from_2022-12-27_18-31-10_SoOnCL3-K.png?ik-sdk-version=javascript-1.4.3&updatedAt=1672145184223"
            alt="playpoint_logo"
            loading="lazy"
          />
          <p>
            Playpoint is using the <span>Sepolia testnet</span> to test platform
            to identify and <span>fix issues</span> before a product is
            launched.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
