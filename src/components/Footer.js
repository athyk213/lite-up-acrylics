import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        background: "black",
        padding: "10px",
        color: "white",
        marginTop: "auto",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h3>Questions? Contact Me!</h3>
        <p>
          Email: <a href="mailto:help@lite-up.net">help@lite-up.net</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
