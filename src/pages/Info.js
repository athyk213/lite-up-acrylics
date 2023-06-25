import "./Info.css";

export default function Info() {
  return (
    <>
      <div className="about-section">
        <h1>Info Page</h1>
        <h5>Find out different customizable acrylic options!</h5>
      </div>
      <div className="about-cards">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "80%",
            paddingTop: "20px",
          }}
        >
          <div className="actual">
            <img
              src="https://i.scdn.co/image/ab67616d0000b2737005885df706891a3c182a57"
              alt="IGOR"
              style={{ maxWidth: "100%" }}
            />
            <img
              src="https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526"
              alt="Blonde"
              style={{ maxWidth: "100%" }}
            />
            <img
              src="https://i.scdn.co/image/ab67616d0000b2730db43130a9aaa7bae56967ed"
              alt="Without Warning"
              style={{ maxWidth: "100%" }}
            />
            <img
              src="https://i.scdn.co/image/ab67616d0000b27381a6a2cafab2e7a4066b5eec"
              alt="At Long Last"
              style={{ maxWidth: "100%" }}
            />
          </div>
          <img
            src="https://i.imgur.com/pFGnA1l.jpg"
            alt="Wall Mount"
            style={{ width: "50%", paddingLeft: "20px" }}
          />
        </div>
        <div className="text_container">
          <h2>Wall Mount*</h2>
          <p className="title">
            Example: IGOR by Tyler, The Creator | Blonde by Frank Ocean |
            Without Warning by Metro Boomin | At.Long.Last.A$AP by A$AP Rocky
          </p>
          <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        </div>
      </div>

      <div className="about-cards">
        <img
          src="https://i.scdn.co/image/ab67616d0000b2734ae1c4c5c45aabe565499163"
          alt="LED Stand"
          style={{ width: "35%", paddingTop: "20px" }}
        />
        <img
          src="https://i.scdn.co/image/ab67616d0000b2734ae1c4c5c45aabe565499163"
          alt="LED Stand"
          style={{ width: "35%", paddingTop: "20px" }}
        />
        <div className="container">
          <h2>LED Stand*</h2>
          <p className="title">Example: AM by Arctic Monkeys</p>
          <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        </div>
      </div>
      <div
        className="asterisk"
        style={{ textAlign: "center", paddingBottom: "20px" }}
      >
        <p>*Black & White album covers typically come out better!</p>
      </div>
    </>
  );
}
