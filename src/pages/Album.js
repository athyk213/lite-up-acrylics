import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Album.css";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Options from "./Options";

const CLIENT_ID = "d670f70841134cd29b66c8d11b76397e";
const CLIENT_SECRET = "04c2a4b9289b425dbeec17f1ffc98898";

export default function Album({
  cartCount,
  setCartCount,
  setAlbumsInCart,
  setQuantities,
  albumsInCart,
  quantities,
  signedIn,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [albumToDisplay, setAlbumToDisplay] = useState(
    location.state?.selectedAlbum
  );
  const [accessToken, setAccessToken] = useState("");
  const [noAlbum, setNoAlbum] = useState(!albumToDisplay);
  const fetchedAlbums = location.state?.fetchedAlbums;

  const goBack = () => {
    navigate("/", {
      state: {
        pressedBackAlbums: fetchedAlbums,
      },
    });
  };
  const addToCart = async (item) => {
    setCartCount(cartCount + 1);
    setAlbumsInCart([...albumsInCart, item]);
  };

  const addToQuantities = (quantity) => {
    setQuantities([...quantities, quantity]);
  };

  useEffect(() => {
    async function fetchAlbum() {
      const albumId = location.pathname.split("/").pop();
      const response = await fetch(
        `https://api.spotify.com/v1/albums/${albumId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = await response.json();
      setAlbumToDisplay(data);
      setNoAlbum(true);
    }

    if (!accessToken) {
      // Access token hasn't been set yet, so fetch it first
      var authParameters = {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body:
          "grant_type=client_credentials&client_id=" +
          CLIENT_ID +
          "&client_secret=" +
          CLIENT_SECRET,
      };
      fetch("https://accounts.spotify.com/api/token", authParameters)
        .then((result) => result.json())
        .then((data) => setAccessToken(data.access_token));
    } else if (!albumToDisplay) {
      fetchAlbum();
    }
  }, [location.pathname, albumToDisplay, accessToken, noAlbum]);

  if (!albumToDisplay) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!noAlbum && (
        <Button
          className="btn-dark"
          onClick={goBack}
          style={{ position: "relative", left: "30px" }}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{ marginRight: "0.5rem" }}
          />
          Back
        </Button>
      )}
      <div className="album-details-container">
        <img
          src={albumToDisplay.images[0].url}
          alt={albumToDisplay.name}
          className="album-image"
        />
        <div>
          <h1 className="album-title">{albumToDisplay.name}</h1>
          <div className="album-subtitle">
            <p>
              by{" "}
              {albumToDisplay.artists
                .slice(0, 3)
                .map((artist) => artist.name)
                .join(", ")}
              {albumToDisplay.artists.length > 3 ? "and more" : ""} (
              {albumToDisplay.release_date.split("-")[0]})
            </p>
          </div>
          <Options
            addToQuantities={addToQuantities}
            addToCart={addToCart}
            albumToDisplay={albumToDisplay}
            item={"Wall Mount: $20"}
            albumsInCart={albumsInCart}
            signedIn={signedIn}
          ></Options>
          <Options
            addToQuantities={addToQuantities}
            addToCart={addToCart}
            albumToDisplay={albumToDisplay}
            item={"LED Stand: $30"}
            albumsInCart={albumsInCart}
            signedIn={signedIn}
          ></Options>
          <Options
            addToQuantities={addToQuantities}
            addToCart={addToCart}
            albumToDisplay={albumToDisplay}
            item={"Only Acrylic Piece: $10"}
            albumsInCart={albumsInCart}
            signedIn={signedIn}
          ></Options>
        </div>
      </div>
    </>
  );
}
