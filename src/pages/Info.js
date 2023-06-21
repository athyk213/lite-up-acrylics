import "./Info.css";

export default function Info() {
  return (
    <>
      <div className="about-section">
        <h1>Info Page</h1>
        <h5>Find out different customizable acrylic options!</h5>
      </div>
      <div className="about-cards">
        <img
          src="https://i.scdn.co/image/ab67616d0000b2737005885df706891a3c182a57"
          alt="Wall Mount"
          style={{ width: "35%" }}
        />
        <img
          src="https://i.scdn.co/image/ab67616d0000b2737005885df706891a3c182a57"
          alt="Wall Mount"
          style={{ width: "35%" }}
        />
        <div className="container">
          <h2>Wall Mount*</h2>
          <p className="title">Example: IGOR by Tyler, The Creator</p>
          <p>Some text that describes me lorem ipsum ipsum lorem.</p>
        </div>
      </div>

      <div className="about-cards">
        <img
          src="https://i.scdn.co/image/ab67616d0000b2734ae1c4c5c45aabe565499163"
          alt="LED Stand"
          style={{ width: "35%" }}
        />
        <img
          src="https://i.scdn.co/image/ab67616d0000b2734ae1c4c5c45aabe565499163"
          alt="LED Stand"
          style={{ width: "35%" }}
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
