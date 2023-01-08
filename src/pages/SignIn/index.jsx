import React from "react";
import "./styles/style.css";
import { TextField, Checkbox } from "@mui/material";

const SignIn = () => {
  return (
    <div className="signin__container">
      <div className="wrapper">
        <div className="signinhero__container">
          <h1>Welcome to our Community</h1>
          <p>A whole new productive journey starts right here</p>
        </div>
        <div className="signin__form">
          <div className="choice">
            <button>Sign in</button>
            <button>Register</button>
          </div>
          <div
            className="item"
            style={{
              display: "flex",
              background: "#fff",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>📨️ Email</div>
            <input
              type="email"
              variant="outlined"
              placeholder="Enter your email address"
              style={{
                backgroundColor: "transparent",
                border: "none",
                textAlign: "right",
              }}
            />
          </div>
          <TextField
            type="password"
            placeholder="Password"
            sx={{ backgroundColor: "#fff" }}
          />
          <div className="recovery">
            <div className="checkbox_container">
              <Checkbox type="checkbox" id="checkbox" />
              <label htmlFor="checkbox">Keep Me login</label>
            </div>
            <p>Recover Password</p>
          </div>
          <button>Sign In</button>
          <button className="signup__button">Sign Up</button>
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
        </div>
      </div>
    </div>
  );
};

export default SignIn;
