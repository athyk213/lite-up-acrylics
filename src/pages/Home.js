import "bootstrap/dist/css/bootstrap.min.css";
import {
  Container,
  InputGroup,
  FormControl,
  Button,
  Row,
  Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import Autocomplete from "../Autocomplete";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Home.css";

const CLIENT_ID = "d670f70841134cd29b66c8d11b76397e";
const CLIENT_SECRET = "04c2a4b9289b425dbeec17f1ffc98898";

export default function Home({
  albums,
  searchInput,
  setSearchInput,
  setAlbums,
  signedIn,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [accessToken, setAccessToken] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  let [pressedBackAlbums, setPressedBackAlbums] = useState(
    location.state?.pressedBackAlbums
  );

  const handleSearchInput = (event) => {
    const input = event.target.value;
    setSearchInput(input);
    if (input.length >= 1) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  function handleSuggestionClick(suggestion) {
    setShowSuggestions(false);
    setSearchInput(suggestion);
    search(suggestion);
  }
  const uniqueAlbums = pressedBackAlbums
    ? pressedBackAlbums
    : albums.filter((album, index, self) => {
        const lower = album.name.toLowerCase();
        return (
          !lower.includes("instrumental") &&
          index ===
            self.length -
              1 -
              self
                .slice()
                .reverse()
                .findIndex((t) => t.name === album.name)
        );
      });

  useEffect(() => {
    //API Access Token
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
  }, []);
  async function search(query = searchInput) {
    // Get artist ID
    var searchParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };
    var artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + query + "&type=artist",
      searchParameters
    )
      .then((response) => response.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    // Get albums from artist ID
    var albums = [];
    var url =
      "https://api.spotify.com/v1/artists/" +
      artistID +
      "/albums?include_groups=album&market=US&limit=50";
    while (url) {
      var response = await fetch(url, searchParameters);
      var data = await response.json();
      albums = albums.concat(data.items);
      url = data.next;
      if (albums.length >= 200) break;
    }
    setPressedBackAlbums(null);
    setAlbums(albums);
  }
  return (
    <>
      <Container className="search-container">
        <InputGroup size="lg">
          <FormControl
            placeholder="Search for Artist"
            type="input"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                pressedBackAlbums = null;
                search();
                setShowSuggestions(false);
              }
            }}
            onChange={handleSearchInput}
            value={searchInput}
          />
          <Button
            className="btn-dark"
            onClick={() => {
              pressedBackAlbums = null;
              search();
              setShowSuggestions(false);
            }}
          >
            Search
          </Button>
          {showSuggestions && (
            <Autocomplete
              searchInput={searchInput}
              accessToken={accessToken}
              onSuggestionClick={handleSuggestionClick}
            />
          )}
        </InputGroup>
        {uniqueAlbums.length === 0 && !signedIn && (
          <h1 style={{ textAlign: "center", margin: "20px" }}>
            <Link to="/signin" style={{ color: "blue" }}>
              SIGN IN
            </Link>{" "}
            to save your albums in cart!
          </h1>
        )}
      </Container>
      <Container>
        <Row className="mx-2 mt-3 row row-cols-4 justify-content-center">
          {uniqueAlbums.map((album, i) => {
            return (
              <Card key={i} className="album-card">
                <Link
                  to={`/album/${album.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/album/${album.id}`, {
                      state: {
                        selectedAlbum: album,
                        fetchedAlbums: uniqueAlbums,
                      },
                    });
                  }}
                  style={{ color: "black" }}
                >
                  <Card.Img className="mt-2" src={album.images[0].url} />
                  <Card.Body className="text-center">
                    <Card.Title>
                      <b>{album.name}</b>
                    </Card.Title>
                    <Card.Text>{album.release_date.split("-")[0]}</Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
