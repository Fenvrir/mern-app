import React from "react";
import "./Links.scss";

const Links = () => {
  return (
    <nav>
      <div className="nav-wrapper blue darken-3">
        <a href="/links" className="brand-logo right">MERV</a>
        <ul id="nav-mobile" className="left ">
            <li><a href="/links" >Link1</a></li>
            <li><a href="/links" >Link1</a></li>
            <li><a href="/links" >Link1</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Links;
