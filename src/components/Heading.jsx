import React from "react";

function Heading(props){

  return  (
    <div className="heading-wrapper">
        <header className="heading title">{props.urlTitle}</header>
        <a href="https://ambermoo.github.io/personal-website-repo/" className="heading home-link links">Home</a>
    </div>
  )
}

export default Heading;