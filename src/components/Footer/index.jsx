import { Typography, Button, InputBase } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

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
            Playpoint is an online platform for predicting sporting events using
            blockchain technology. It includes a marketplace, vendor showcase,
            prediction hub, and various prediction pools.
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
                sx={{ backgroundColor: "#fff", padding: "0 .6em" }}
                placeholder="Enter Your Email"
              />
              <button>Subscribe</button>
            </div>
          </div>
          <div className="icons">
            <a href="https://github.com/L1Playpoint" className="icon">
              <i className="ri-github-fill"></i>
            </a>
            <a href="#" className="icon">
              <i className="ri-discord-fill"></i>
            </a>
            <a href="#" className="icon">
              <i className="ri-telegram-fill"></i>
            </a>
            <a href="https://twitter.com/PlaypointP2E">
              <i className="ri-twitter-fill"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="copy">
          <Typography>Copyright &copy; Playpoint Labs, 2022. All Rights Reserved</Typography>
          <Link to="privacy-policy">Privacy Policy</Link>
          <Link to="terms-conditions">Terms & Conditions</Link>
        </div>
        <Typography>Built with ❤️ by Playpoint Labs, in collab with CodewithSudeep & Jcka Labs. </Typography>
      </div>
    </div>
  );
};

export default index;
