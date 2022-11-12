import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/style.css";

export default function NotFound() {
    const navigate = useNavigate();

  return (
    <div className="notFound__container">
        <h2>
            Something went wrong!
        </h2>
      <img
        src="https://ik.imagekit.io/domsan/Screen_Shot_2022-09-24_at_23.37.15_K2oc2jdPc.png?ik-sdk-version=javascript-1.4.3&updatedAt=1664041945064"
        alt="404 Image Request"
        loading="lazy"
      />
      <Button onClick={() => navigate("/")}>
        <i className="ri-arrow-left-line"></i> Go Back Home
      </Button>
    </div>
  );
}
