import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Album from "./pages/Album";
import Navbar from "./components/Navbar";
import Info from "./pages/Info";
import { useState } from "react";

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [albumsInCart, setAlbumsInCart] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [albums, setAlbums] = useState([]);
  const [signedIn, setSignedIn] = useState(false);

  return (
    <>
      <Navbar
        cartCount={cartCount}
        setSearchInput={setSearchInput}
        setAlbums={setAlbums}
        signedIn={signedIn}
        setSignedIn={setSignedIn}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              albums={albums}
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              setAlbums={setAlbums}
              signedIn={signedIn}
            />
          }
        />
        <Route path="/info" element={<Info />} />
        <Route
          path="/cart"
          element={
            <Cart
              albumsInCart={albumsInCart}
              quantities={quantities}
              cartCount={cartCount}
              setAlbumsInCart={setAlbumsInCart}
              setQuantities={setQuantities}
              setCartCount={setCartCount}
              setSearchInput={setSearchInput}
              setAlbums={setAlbums}
              signedIn={signedIn}
            />
          }
        />
        <Route
          path="/album/:id"
          element={
            <Album
              cartCount={cartCount}
              setCartCount={setCartCount}
              setAlbumsInCart={setAlbumsInCart}
              setQuantities={setQuantities}
              albumsInCart={albumsInCart}
              quantities={quantities}
            />
          }
        />
      </Routes>
    </>
  );
}
