import { Typography, Button, InputBase } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles/style.css";


const index = () => {

  const [email, setEmail] = React.useState("");

const ValidateEmail = (mail) => {
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
    return (true)
  }
  toast("You have entered an invalid email address!",{type:'error'})
  return (false)
}

const handleSubmit = () =>{
  if(ValidateEmail(email)){
    console.log(email);
  }
}

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
            sporting events, supported by decentralized blockchain networks.
            <br />
            The affiliated Participants take part in the prediction pool
            sweepstakes by selecting a match or matches (fixtures) prescribed in
            the Playpoint Showcase, and ultimately answering to the fixtures
            related sets of prediction questions composed, assessed or set up by
            Playpoint Questionnaires hub.
          </Typography>
        </div>

        <div className="links__container">
          <div className="links">
            <h3>About Playpoint</h3>
            <div>
              <a href="#">Marketplaces</a>
            </div>
            <div>
              <a href="https://docs.playpoint.ai/" target={"_blank"}>
                Documentation
              </a>
            </div>
            <Link to={"challenges"}>Challenges</Link>
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
                type="email"
                onChange={e=>setEmail(e.target.value)}
              />
              <button onClick={()=>handleSubmit()}>Subscribe</button>
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
          <Typography>
            Copyright &copy; Playpoint Labs, 2022. All Rights Reserved
          </Typography>
          <Link to="privacy-policy">Privacy Policy</Link>
          <Link to="terms-conditions">Terms & Conditions</Link>
        </div>
        <Typography>
          Built with ❤️ by Playpoint Labs, in collab with CodewithSudeep & Jcka
          Labs.{" "}
        </Typography>
      </div>
    </div>
  );
};

export default index;
