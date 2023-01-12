import React from "react";
import "./styles/style.css";

const SignIn = () => {
  const [active, setActive] = React.useState(false);
  const [inputvalue, setInputValue] = React.useState({});

  const itemsRef = React.useRef([]);

  const inputs = [0, 1, 2, 3, 4, 5];

  React.useEffect(() => {
    itemsRef.current = itemsRef.current.slice(0, inputs.length);
  }, []);

  const handleChange = (e, index) => {
    setInputValue({
      ...inputvalue,
      [e.target.name]: e.target.value,
    });
    if (index === inputs.length - 1) {
      return;
    } else {
      itemsRef.current[index + 1].focus();
    }
  };

  // const handleDelete = (e, index) => {
  //   if (index === inputs.length - 1) {
  //     return;
  //   } else if (e.KeyCode === 8) {
  //     itemsRef.current[index - 1].focus();
  //   }
  // };

  return (
    <div className="signin__container">
      <div className="wrapper">
        <div className="signinhero__container">
          <h1>Welcome to our Community</h1>
          <p>A whole new productive journey starts right here</p>
        </div>
        <div className="signinform__container">
          {!active ? (
            <div className={`signin__form ${active ? "active" : ""}`}>
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
            </div>
          ) : (
            <div className="otp__container">
              <div className="title">
                <h3>OTP Verification</h3>
                <p>Enter OTP sent to eriag321@gmail.com</p>
              </div>

              <div className="boxes">
                {inputs.map((box, index) => {
                  return (
                    <div className="box" key={index}>
                      <input
                        type="text"
                        maxLength={1}
                        name={`input-${index}`}
                        ref={(el) => (itemsRef.current[index] = el)}
                        value={inputvalue[index]}
                        onChange={(e) => {
                          handleChange(e, index);
                        }}
                        // onKeyDown={(e) => handleDelete(e, index)}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        onFocus={(e) => e.target.select}
                        autoFocus={itemsRef}
                      />
                    </div>
                  );
                })}
              </div>

              <p className="resend">
                Didn't receive OTP ? <span>Resend OTP</span>
              </p>

              <button>Confirm OTP</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
