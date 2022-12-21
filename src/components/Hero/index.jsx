import React from "react";
import "./styles/style.css";
import hero from "../../images/new.png";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate()
  return (
    <div className="hero__container">
      <div className="blob"></div>
      <div className="blob1"></div>
      <div className="heroIntroduction">
        <div className="heroContent">
          <h1>Predict & Win</h1>
          <div className="card">
            {/* <Typography>Introduction!</Typography> */}
            {/* <Typography variant="h2" component={"h2"}>
              Start playing and Earning today!
            </Typography> */}
            <Typography className="introduction">
              Playpoint is an online prediction pool platform based on real-time
              sporting events, supported by decentralized blockchain networks.
            </Typography>
            <p>We are introducing duo and trio pools soon.</p>
            <Typography className="visit">Visit active marketplaces to take part in our prediction pool.</Typography>
            <a
              target={"_blank"}
              href="https://docs.playpoint.ai/"
              title="docs.playpoint.ai"
            >
              Learn more
            </a>
            <div className="beginButton" tabIndex="0" role="button" onClick={() => navigate("marketplace")}>
              Begin
            </div>
            <p>Be the next winner!</p>
          </div>
        </div>
        <div className="heroImage">
          <img src={hero} alt="hero Image" />
        </div>
      </div>
      <div className="hero">
        <div className="pptt">
          <img
          src="https://89devs.com/img/solidity/sepolia_dolphin.png"
            alt="playpoint_logo"
            loading="lazy"
          />
          <p>Currently we are testing on sepolia testnet.</p>
        </div>
        <div className="arbt">
          <img
            src="https://assets-global.website-files.com/6364e65656ab107e465325d2/637ea09ce69ec8d049fb871e_nt4Cn4mhAnXmPqN4XNw7P3C8w59Mi18UQsJr0Kv-OWU.svg"
            alt="playpoint_logo"
            loading="lazy"
          />
          <p>We are available in Arbitrum</p>
        </div>{" "}
      </div>
    </div>
  );
};

export default Hero;
