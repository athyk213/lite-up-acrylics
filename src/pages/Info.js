import "./Info.css";

export default function Info() {
  return (
    <>
      <div className="about-section">
        <h1>Info Page</h1>
        <h5>Find out different customizable acrylic options!</h5>
      </div>
      <div className="about-cards">
        <div className="mount-container">
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
            className="albums-photo"
          />
        </div>
        <div className="text_container">
          <h2>Wall Mount</h2>
          <p className="title">
            Example: IGOR by Tyler, The Creator | Blonde by Frank Ocean |
            Without Warning by Metro Boomin | At.Long.Last.A$AP by A$AP Rocky
          </p>
          <p>
            Enhance your home decor with custom-made acrylic/Plexiglass wall
            mounts of your favorite albums! Display your favorite music albums
            with style and elegance. The sleek, transparent design adds a modern
            touch to your living space. Included are damage-free hanging strips
            by Command™, so you can securely mount your albums without worrying
            about damaging your walls! <br />
            <br /> Dimensions: <br />
            Wall Mount: 5.7"W x 5.7"H x 0.375"T <br />
            <br /> Included: <br />
            Command™ Large Picture Hanging Strips x 2
          </p>
          <a href="/">Search for an artist's albums</a>
        </div>
      </div>

      <div className="about-cards">
        <div className="led-container">
          <img
            src="https://i.scdn.co/image/ab67616d0000b273f864bcdcc245f06831d17ae0"
            alt="LED Stand"
            className="actual-led"
          />
          <video
            src="https://i.imgur.com/ggmVCqG.mp4"
            muted
            controls
            alt="LED Stand"
            className="led-stand"
          />
        </div>
        <div className="text_container">
          <h2>LED Stand</h2>
          <p className="title">Example: Ghost Stories by Coldplay</p>
          <p>
            Bring your favorite albums to life with custom-made
            acrylic/Plexiglass LED stands! This modern product combines the wall
            mount design with vibrant LEDs, creating beautiful lighting effects
            that illuminate the album art. With a transparent design adding
            elegance to your space, these stands bring a touch of sophistication
            to your interior design.
            <br />
            <br /> Dimensions: <br /> Acrylic Piece: 5"W x 5.6"H x 0.125"T
            <br /> LED Base: 3.66"D x 3.66"W x 1.5"H <br />
            <br /> Included: <br />
            USB Power Cable <br />
            Standard 24k Remote Control
          </p>
          <a href="/">Search for an artist's albums</a>
        </div>
      </div>
      <div
        className="asterisk"
        style={{ textAlign: "center", paddingBottom: "20px" }}
      >
        <p>*Black & White album covers typically look better!</p>
      </div>
    </>
  );
}
