import { Typography, InputBase } from "@mui/material";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./styles/style.css";
import { useTranslation } from "react-i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const index = () => {
  const [email, setEmail] = React.useState("");
  const [lang, setLang] = React.useState("");
  const [clicked, setClicked] = React.useState(false);

  // Contains the value and text for the options
  const languages = [
    {
      code: "en",
      name: "English",
      country_code: "gb",
    },
    {
      code: "fr",
      name: "Français",
      country_code: "fr",
    },
    {
      code: "hi",
      name: "हिंदी",
      country_code: "in",
    },
    {
      code: "es",
      name: "spanish",
      country_code: "es",
    },
    {
      code: "tl",
      name: "Flipino",
      country_code: "tl",
    },
    {
      code: "zh",
      name: "中國人",
      country_code: "cn",
    },
    {
      code: "en-CA",
      name: "English (CA)",
      country_code: "ca",
    },
    {
      code: "en-AU",
      name: "English (AU)",
      country_code: "au",
    },
    {
      code: "ja",
      name: "Japanese",
      country_code: "jp",
    },
  ];

  const { t, i18n } = useTranslation();
  const location = useLocation();
  const ValidateEmail = (mail) => {
    if (
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        mail
      )
    ) {
      return true;
    }
    toast("You have entered an invalid email address!", { type: "error" });
    return false;
  };

  const handleSubmit = () => {
    if (ValidateEmail(email)) {
      console.log(email);
    }
  };

  const handleChange = (e) => {
    let loc = location.pathname;
    // const temp = i18n.changeLanguage(e.target.value);
    setLang(e.target.value);
    window.location.replace(loc + "?lang=" + lang);
  };

  return (
    <div className="footer__container">
      <div className="footer">
        <div className="playpoint">
          <div className="intro">
            <img
              src="https://ik.imagekit.io/domsan/Logo_0vBSw9piY.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1662803005580"
              alt=""
            />

            <h1>{t("Playpoint")}</h1>
          </div>
          <Typography>
            {t("Introduction")}
            <br />
            {t("more_intro")}
          </Typography>
        </div>

        <div className="links__container">
          <div className="links">
            <h2>{t("About_Playpoint")}</h2>
            <div>
              <Link to={"marketplace"}>{t("Marketplaces")}</Link>
            </div>
            <div>
              <a href="https://docs.playpoint.ai/" target={"_blank"}>
                {t("Documentation")}
              </a>
            </div>
            <Link to={"challenges"}>{t("Challenges")}</Link>
          </div>
        </div>
        <div className="social">
          <div className="text">
            <h2>{t("Join_Our_Newsletter")}</h2>
            <Typography>
              {t(
                "Stay_up_to_date_with_our_news_blog_posts_and_announcements_by_subscribing_to_our_Newsletter"
              )}
            </Typography>
            <div className="subscribe">
              <InputBase
                sx={{ backgroundColor: "#fff", padding: "0 .6em" }}
                placeholder="Enter Your Email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={() => handleSubmit()}>Subscribe</button>
            </div>
          </div>
          <div className="icons__container">
            <div className="icons">
              <a
                rel="norefferer"
                target="_blank"
                href="https://github.com/L1Playpoint"
                className="icon"
              >
                <i className="ri-github-fill"></i>
              </a>
              <a
                href="https://discord.gg/YXvCFeGb"
                target={"_blank"}
                rel="noopener noreferrer"
                className="icon"
              >
                <i className="ri-discord-fill"></i>
              </a>
              <a rel="norefferer" target="_blank" href="#" className="icon">
                <i className="ri-telegram-fill"></i>
              </a>
              <a
                rel="norefferer"
                target="_blank"
                href="https://twitter.com/PlaypointP2E"
              >
                <i className="ri-twitter-fill"></i>
              </a>
            </div>

            <div className="dropdown">
              <button
                onClick={() => setClicked((prev) => !prev)}
                className="dropdown__btn"
              >
                <i className="ri-global-line"></i>
                <i className="ri-arrow-drop-down-line"></i>
              </button>
              {clicked && (
                <ul className="dropdown-content">
                  {languages.map(({ code, name, country_code }, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => setClicked((prev) => !prev)}
                      >
                        <button onClick={() => i18n.changeLanguage(code)}>
                          <span className={`fi fi-${country_code}`}></span>
                          {name}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="copy">
          <Typography>
            {t("Copyright")} &copy; Playpoint Labs, 2022.{" "}
            {t("All Rights Reserved")}
          </Typography>
          <Link to="privacy-policy">{t("Privacy Policy")}</Link>
          <Link to="terms-conditions">{t("Terms & Conditions")}</Link>
        </div>
        <Typography>
          {t("Built with")} ❤️ by CodewithSudeep & Jcka Labs.{" "}
        </Typography>
      </div>
    </div>
  );
};

export default index;
