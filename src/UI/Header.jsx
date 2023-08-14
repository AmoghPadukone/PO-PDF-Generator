import React from "react";
import logo from "../assets/logo.png";

const Header = (props) => {
  return (
    <header
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <img src={logo} alt="" />
    </header>
  );
};

export default Header;
