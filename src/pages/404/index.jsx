import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles/style.css";

export default function NotFound() {
    const navigate = useNavigate();

  return (
    <div className="notFound__container">
      <img
        src="https://ik.imagekit.io/domsan/Screenshot_from_2023-01-17_19-50-15_MjZ-ZL5ay.png?ik-sdk-version=javascript-1.4.3&updatedAt=1673964329695"
        alt="404 Image Request"
        loading="lazy"
      />
      <Button onClick={() => navigate("/")}>
        Go Back Home
      </Button>
    </div>
  );
}
