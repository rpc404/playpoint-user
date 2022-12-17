import React from "react";
import "./styles/style.css";
import hero from "../../images/new.png";
import { Typography } from "@mui/material";

const Hero = () => {
  return (
    <div className="hero__container">
      <div className="hero">
        <div className="blob"></div>
        <div className="blob1"></div>
        <div className="heroContent">
          <h1>Predict & Win</h1>
          <div className="card">
            <Typography>Introduction!</Typography>
            <Typography variant="h2" component={"h2"}>
              Begin playing and Earning today!
            </Typography>
            <Typography>
              Playpoint is an online prediction pool platform based on real-time
              sporting events, supported by decentralized blockchain networks.
            </Typography>
            <a
              target={"_blank"}
              href="https://docs.playpoint.ai/"
              title="docs.playpoint.ai"
            >
              Learn more
            </a>
            <div className="beginButton" tabIndex="0" role="button">
              Begin
            </div>
            <p>Be the next winner!</p>
          </div>
        </div>
        <div className="heroImage">
          <img src={hero} alt="hero Image" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
