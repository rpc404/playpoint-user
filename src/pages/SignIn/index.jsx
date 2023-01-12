import React from "react";
import "./styles/style.css";
import image from "../../images/security.jpg";
import { authenticate } from "../../api/Auth";
import { toast } from "react-toastify";

const SignIn = () => {
  const [active, setActive] = React.useState(false);
  const [inputvalue, setInputValue] = React.useState({});
  const [email, setEmail] = React.useState("");
  const [_activeInput, setActiveInput] = React.useState(-1);

  const handleChange = (index, value)=>{
    if(value){
      sessionStorage.setItem("otp"+index, value);
      setActiveInput(index);
    }else{
      sessionStorage.removeItem("otp"+index);
      setActiveInput(index-1);
    }
  }

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
        if(res.data.msg.toLowerCase()=="otp sent"){
            setActive(true)
        }
      })
    }
   
  }
  const verify = () =>{
    toast("Under Maintainance");
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
                {[0, 1, 2, 3, 4, 5].map((box, index) => {
                  return (
                    <div className="box" key={index}>
                      <input
                        type="text"
                        maxLength={1}
                        name={`input-${index}`}
                        value={inputvalue.index}
                        onChange={(e) => {
                          handleChange(index,e.target.value)
                        }}
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        autoFocus={index==_activeInput+2 ? true : false}
                        disabled={index>_activeInput+1 || index < _activeInput ?true:false}
                      />
                    </div>
                  );
                })}
              </div>

              <p className="resend">
                Didn't receive OTP ? <span>Resend OTP</span>
              </p>

              <button onClick={()=>verify()}>Confirm OTP</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
