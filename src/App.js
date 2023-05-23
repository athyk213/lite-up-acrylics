import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Album from "./pages/Album";
import Navbar from "./components/Navbar";
import Info from "./pages/Info";
import { useEffect, useState } from "react";
import SignIn from "./auth/SignIn";
import Validate from "./auth/Validate";
import Register from "./auth/Register";

import { API, Amplify, Auth } from "aws-amplify";
import awsExports from "./aws-exports";
import { listOrders } from "./graphql/queries";

Amplify.configure(awsExports);

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [albumsInCart, setAlbumsInCart] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [albums, setAlbums] = useState([]);
  const [signedIn, setSignedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  function updateAuthStatus(authStatus) {
    setSignedIn(authStatus);
  }
  const userPoolClientId = process.env.REACT_APP_USER_POOL_CLIENT_ID;

  useEffect(() => {
    const user = localStorage.getItem(
      `CognitoIdentityServiceProvider.${userPoolClientId}.LastAuthUser`
    );
    if (user) {
      setSignedIn(true);
    }

    async function setSignedInAlbums() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const userId = user.attributes.sub;
        setUsername(user.username);

        const result = await API.graphql({
          query: listOrders,
          variables: {
            filter: {
              userId: { eq: userId },
            },
          },
        });
        setAlbumsInCart(
          result.data.listOrders.items.map((item) => ({
            album: {
              id: item.album[0].id,
              name: item.album[0].name,
              images: item.album[0].images,
              artists: item.album[0].artists,
              release_date: item.album[0].release_date,
            },
            option: item.option,
            price: item.price,
          }))
        );

        setQuantities(
          result.data.listOrders.items.map((item) => item.quantity)
        );
        setCartCount(result.data.listOrders.items.length);
      } catch (error) {
        alert(error);
      }
    }

    if (signedIn) {
      setSignedInAlbums();
    }
  }, [signedIn, userPoolClientId]);

  return (
    <>
      <Navbar
        cartCount={cartCount}
        setSearchInput={setSearchInput}
        setAlbums={setAlbums}
        signedIn={signedIn}
        updateAuthStatus={updateAuthStatus}
        setAlbumsInCart={setAlbumsInCart}
        setQuantities={setQuantities}
        setCartCount={setCartCount}
        username={username}
        setUsername={setUsername}
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
              signedIn={signedIn}
            />
          }
        />
        <Route
          path="/signin"
          element={
            <SignIn
              updateAuthStatus={updateAuthStatus}
              username={username}
              password={password}
              setUsername={setUsername}
              setPassword={setPassword}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/validate" element={<Validate />} />
      </Routes>
    </>
  );
}
