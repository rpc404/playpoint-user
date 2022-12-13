import React from "react";
import "./styles/style.css";
import hero from "../../images/new.png";
import { Typography } from "@mui/material";

const Hero = () => {
  return (
    <div className="hero__container">
      <div className="hero">
        <div className="heroContent">
          <h1>Predict & Win</h1>
          <div className="card">
            <Typography>Introduction</Typography>
            <Typography variant="h2" component={"h2"}>
              Begin playing and Earning today!
            </Typography>
            <Typography>
              Playpoint is an online prediction pool platform based on real-time
              sporting events, supported by decentralized blockchain networks.
              Its primary networks comprises a logical Marketplace, a virtual
              Showcase vendor, a prediction Questionnaires hub, and variant
              prediction Pools.
            </Typography>
            <div className="beginButton">Begin</div>
          </div>
        </div>
        <div className="heroImage">
          <img src={hero} alt="hero Image" />
          <div className="blob">
            {/* <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="#2dabde87"
                d="M20.9,14.8C9.5,31.8,-29.4,35.6,-37.5,20.5C-45.5,5.4,-22.8,-28.7,-3.3,-30.6C16.2,-32.5,32.3,-2.3,20.9,14.8Z"
                transform="translate(100 100)"
              />
            </svg> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
