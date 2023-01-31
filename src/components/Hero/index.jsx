import React from "react";
import { useTranslation } from "react-i18next";
import "./styles/style.css";

export default function Hero() {
  const { t } = useTranslation();
  return (
    <div className="hero__container">
      <div className="divider"></div>
      <div className="heroContent__container">
        <h1>
          {t("Discover")}
          <br />
          {t("predict_to_win")}
          <br />
          {t("WinAwards")}
        </h1>

        <div className="heroDivider">
          <div className="divider__line"></div>
        </div>

        <div className="heroParticipants__container">
          <div className="userImages">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
              alt="firstUser"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              alt="secondUser"
            />
            <img
              src="https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=712&q=80"
              alt="thirdUser"
            />
          </div>
          <p>
            <span>2.2k</span> {t("ActiveParticipants")}
          </p>
        </div>

        <p className="description">{t("HeroIntroduction")}</p>
      </div>
      <div className="heroGallery__container">
        <img
          loading="eager"
          src="https://ik.imagekit.io/domsan/Screenshot_from_2023-01-09_18-35-22_zJL0CkuV9o.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673268642929"
          alt=""
          height={"460"}
          width={"320"}
        />
        <div className="absoluteImages">
          <img
            loading="eager"
            src="https://ik.imagekit.io/domsan/Screenshot_from_2023-01-09_18-33-26_E0Q8XT_Y3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673268519443"
            alt="1st_absolutehero_image"
            height={"335"}
            width={"222"}
          />
          <img
            loading="eager"
            src="https://ik.imagekit.io/domsan/Screenshot_from_2023-01-09_18-31-23_ZNdB8ldbl.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673268422379"
            alt="2nd_absolute_heroimage"
            height={"245"}
            width={"200"}
          />
        </div>
      </div>

      <div className="heroAdditionalInfo">
        <p className="description">
          <b>{t("Note")}</b>: {t("NoteIntro")}
        </p>
        <div className="addtionalInfoContent">
          <div>
            <img
              src="https://ik.imagekit.io/domsan/Screenshot_from_2023-01-09_18-56-19_aZevJJ4V3y.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673269899496"
              alt="1st_addtional_image"
              height={"220"}
              width={"220"}
              loading="eager"
            />
            <img
              className="rotatingImage"
              src="https://ik.imagekit.io/domsan/Screenshot_from_2023-01-11_21-11-41_HPGTmzrrO.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673450896932"
              alt="2nd_additional_image"
              height={"220"}
              width={"220"}
              loading="eager"
            />
          </div>
          <img
            src="https://ik.imagekit.io/domsan/Screenshot_from_2023-01-11_21-16-21_SfQPymXZk.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673451095728"
            alt="3rd_additional_image"
            height={"220"}
            width={"220"}
            loading="eager"
          />
        </div>
      </div>
      <div className="divider last"></div>
    </div>
  );
}
