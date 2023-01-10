import React from "react";
import "./styles/style.css";
import image from "../../images/verified.png";
import { motion, LayoutGroup, AnimatePresence, delay } from "framer-motion";

const SignIn = () => {
  const [active, setActive] = React.useState(false);
  return (
    <div className="signin__container">
      <div className="wrapper">
        <div className="signinhero__container">
          <h1>Welcome to our Community</h1>
          <p>A whole new productive journey starts right here</p>
        </div>
        <AnimatePresence>
          <LayoutGroup>
            <div className="signinform__container">
              <motion.div
                className="signin__form"
                layout
                animate={{ x: active ? -350 : 100 }}
                transition={{ delay: 0.2 }}
              >
                <div className="item">
                  <div>📥️ Email</div>
                  <input type="email" placeholder="Enter your email address" />
                </div>
                <div className="recovery">
                  <div className="checkbox_container">
                    <input type="checkbox" id="checkbox" />
                    <label htmlFor="checkbox">Keep Me login</label>
                  </div>
                  <p>Recover Password</p>
                </div>
                <button onClick={() => setActive(true)}>Sign Up</button>
                <div className="continue">
                  <div>
                    <span></span>
                    <p>or Continue With</p>
                    <span></span>
                  </div>
                  <p>
                    <i className="ri-google-fill"></i>
                  </p>
                </div>
              </motion.div>
              <motion.div
                className="otp__container"
                layout
                // style={{ display: active ? "flex" : "none" }}
                animate={{ x: active ? -150 : 550 }}
                transition={{ delay: 0.5 }}
              >
                <img src={image} alt="verified_image" />
                <div className="title">
                  <h3>OTP Verification</h3>
                  <p>Enter OTP sent to eriag321@gmail.com</p>
                </div>

                <div className="boxes">
                  <p className="box"></p>
                  <p className="box"></p>
                  <p className="box"></p>
                  <p className="box"></p>
                </div>

                <p>
                  Didn't receive OTP ? <span>Resend OTP</span>
                </p>

                <button>Confirm OTP</button>
              </motion.div>
            </div>
          </LayoutGroup>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SignIn;
