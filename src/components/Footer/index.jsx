import { Typography, Button, InputBase } from "@mui/material";
import React from "react";

const index = () => {
  return (
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
          <Typography>
            Playpoint is an online prediction pool platform based on real-time
            sporting events, supported by decentralized blockchain networks. Its
            primary networks comprises a logical Marketplace, a virtual Showcase
            vendor, a prediction Questionnaires hub, and variant prediction
            Pools.
          </Typography>
        </div>

        <div className="links__container">
          <div className="links">
            <h3>About Playpoint</h3>
            <div>
              <a href="#">Marketplaces</a>
            </div>
            <a href="#">Fixtures</a>
            <a href="#">Wallet</a>
            <a href="#">Launch App</a>
          </div>
        </div>
        <div className="social">
          <div className="text">
            <h3>
              <strong>Join Our Newsletter</strong>
            </h3>
            <Typography>
              Stay up to date with our news, blog posts, and announcements by
              subscribing to our Newsletter.
            </Typography>
            <div className="subscribe">
              <InputBase
                sx={{ backgroundColor: "#fff", padding: "0 .2em" }}
                placeholder="Enter Your Email"
              />
              <button>Subscribe</button>
            </div>
          </div>
          <div className="icons">
            <a href="#" className="icon">
              <i className="ri-github-fill"></i>
            </a>
            <a href="#" className="icon">
              <i className="ri-discord-fill"></i>
            </a>
            <a href="#" className="icon">
              <i className="ri-telegram-fill"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="copy">
          <Typography>&copy; Copyright Playpoint.AI, 2022</Typography>
          <Typography>Privacy Policy</Typography>
          <Typography>Terms of Use</Typography>
        </div>
        <Typography>
          Built with <i className="ri-heart-line"></i> by Playpoint.Ai{" "}
        </Typography>
      </div>
    </div>
  );
};

export default index;
