import React from "react";
import "./styles/style.css";

const Loader = () => {
  return (
    <div>
      <div className="loader__container">
        <div
          className="loading__container"
        >
          <img
            src="https://ik.imagekit.io/domsan/Logo_0vBSw9piY.webp?ik-sdk-version=javascript-1.4.3&updatedAt=1662803005580"
            alt="playpoint__logo"
            className="loadingCircle"
          />
        </div>
      </div>
    </div>
  );
};

export default Loader;
