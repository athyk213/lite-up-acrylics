import "./Info.css";

export default function Info() {
  return (
    <>
      <div class="about-section">
        <h1>Info Page</h1>
        <p>Find out different customizable acrylics options!</p>
      </div>
      <div class="row">
        <div class="column">
          <div class="about-cards">
            <img
              src="/w3images/team1.jpg"
              alt="Wall Mount"
              style={{ width: "100%" }}
            />
            <div class="container">
              <h2>Wall Mount</h2>
              <p class="title">CEO & Founder</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>jane@example.com</p>
              <p>
                <button class="button">Contact</button>
              </p>
            </div>
          </div>
        </div>

        <div class="column">
          <div class="about-cards">
            <img
              src="/w3images/team2.jpg"
              alt="LED Stand"
              style={{ width: "100%" }}
            />
            <div class="container">
              <h2>LED Stand</h2>
              <p class="title">Art Director</p>
              <p>Some text that describes me lorem ipsum ipsum lorem.</p>
              <p>mike@example.com</p>
              <p>
                <button class="button">Contact</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
