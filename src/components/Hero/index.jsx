import React from "react";
import Identicon from "react-identicons";
import "./styles/style.css";

export default function Hero() {
  return (
    <div className="hero__container">
      <div className="heroContent__container">
        <h1>
          Discover
          <br />
          Predict to Earn
          <br />
          And Win Awards
        </h1>

        <div className="heroDivider">
          <div className="divider__line"></div>
        </div>

        <div className="heroParticipants__container">
          <div className="userImages">
            {[0, 1, 2, 3].map((d) => (
              <Identicon size="35" string={d} key={d} />
            ))}
          </div>
          <p>
            <span>2.2k</span> Active Participants
          </p>
        </div>

        <p className="description">
          Playpoint is an online platform for predicting sporting events using
          blockchain technology. It includes a marketplace, vendor showcase,
          prediction hub, and various prediction pools.
        </p>
      </div>
      <div className="heroGallery__container">
        <img
          loading="lazy"
          src="https://ik.imagekit.io/domsan/Screenshot_from_2023-01-09_18-35-22_zJL0CkuV9o.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673268642929"
          alt=""
        />
        <div className="absoluteImages">
          <img
            loading="lazy"
            src="https://ik.imagekit.io/domsan/Screenshot_from_2023-01-09_18-33-26_E0Q8XT_Y3.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673268519443"
            alt=""
          />
          <img
            loading="lazy"
            src="https://ik.imagekit.io/domsan/Screenshot_from_2023-01-09_18-31-23_ZNdB8ldbl.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673268422379"
            alt=""
          />
        </div>
      </div>

      <div className="heroAdditionalInfo">
        <p className="description">
          Duo and Trio are challenges where you can predict and challenge
          others. In Duo, you can challenge another person, and in Trio, you can
          challenge two other people. To participate, you can choose how many
          entries you want to open for others to challenge.
        </p>
        <div className="addtionalInfoContent">
          <div>
            <img
              src="https://ik.imagekit.io/domsan/Screenshot_from_2023-01-09_18-56-19_aZevJJ4V3y.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673269899496"
              loading="lazy"
              alt=""
            />
            <div>
              <p>
                <b>P2E Arrives</b>
                <br />
                Multi blockchain network enabled, realtime prediction, duo and
                trio pools, earn PPTT.
              </p>
            </div>
          </div>
          <h1>
            <span>93k PPTT</span>
            <br />
            <span>Pool Amount</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
