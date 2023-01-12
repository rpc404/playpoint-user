import React from "react";
import "./styles/style.css";
import image from "../../images/security.jpg";
import { authenticate, otplogin, _verify } from "../../api/Auth";
import { toast } from "react-toastify";

const SignIn = () => {
  const [active, setActive] = React.useState(false);
  const [inputvalue, setInputValue] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [_activeInput, setActiveInput] = React.useState(-1);
  const [verified, setVerified] = React.useState(false);
  const [variant, setVariant] = React.useState("")

  // React.useEffect(() => {
  //   // Enable pusher logging - don't include this in production
  //   // Pusher.logToConsole = true;
  //   const pusher = new Pusher("e6640b48a82cccbb13d0", {
  //     cluster: "ap2",
  //   });
  //   pusher.connection.bind("connected", function () {
  //     console.log("Weboscket Connected");
  //   });
  //   const predictionChannel = pusher.subscribe("prediction-channel");
  //   predictionChannel.bind("new-prediction", (data) => {
  //     const _predictions =
  //       JSON.parse(sessionStorage.getItem("predictions")) || [];
  //     if (data.data[0].fixtureId == fixtureId) {
  //       const newPrediction = [data.data[0], ..._predictions];
  //       sessionStorage.setItem("predictions", JSON.stringify(newPrediction));

  //       dispatchPredictionsData({
  //         type: "set-predictions",
  //         payload: newPrediction,
  //       });
  //     }
  //   });
  // }, []);

  const ValidateEmail = (mail) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
       return (true)
     }
     toast("You have entered an invalid email address!",{type:'error'})
     return (false)
   }

  const handleSignIn = async () =>{
    if(ValidateEmail(email)){
      await authenticate({email}).then(res=>{
        toast(res.data.msg);
        if(String(res.data.msg).trim()!="You have just reqested for the OTP. please verify or try after a moment"){
          console.log(res.data.msg);
          setVariant(res.data.variant)
          setActive(true)
        }
      })
    }
   
  }
  const verify = async () =>{
    let _otp = inputvalue.trim();
    if(variant=="0"){
      await _verify({email:email, token:_otp}).then(res=>{
        toast(res.data.msg);
        if(res.data.msg.trim()!="Invalid Token"){
          console.log(res.data)
        }
      })
    }
    if(variant=="1"){
      await otplogin({email:email, token:_otp}).then(res=>{
        toast(res.data.msg);
        if(res.data?.msg?.trim()!="Invalid OTP"){
          console.log(res.data)
        }
      })
    }
  }
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
                <input type="email" placeholder="Enter your email address" onChange={e=>setEmail(e.target.value)} />
              </div>
              <div className="recovery">
                <div className="checkbox_container">
                  <input type="checkbox" id="checkbox" />
                  <label htmlFor="checkbox">Keep Me login</label>
                </div>
                <p>Recover Password</p>
              </div>
              <button onClick={() => handleSignIn()}>Sign Up</button>
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
                <p>Enter OTP sent to {email}</p>
              </div>

              <div className="boxes">
                    <div className="box">
                      <input
                        placeholder="Enter Code"
                        type="text"
                        maxLength={6}
                        name={`input-otp`}
                        value={inputvalue}
                        onChange={(e) => {
                          setInputValue(e.target.value)
                        }}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                      />
                    </div>
                 
              </div>

              <p className="resend">
                Didn't receive OTP ? <span onClick={()=>{setActive(false), setInputValue("")}}>Resend OTP</span>
              </p>

              <button onClick={()=>verify()}>Confirm OTP</button>
            </div>
          )}
          {}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
