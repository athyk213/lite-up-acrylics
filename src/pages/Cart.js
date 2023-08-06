import { Card, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PayPal from "../components/PayPal";
import { useState } from "react";
import { deleteOrder, updateOrder } from "../graphql/mutations";
import { listOrders } from "../graphql/queries";
import { API, graphqlOperation } from "aws-amplify";

export default function Cart({
  cartCount,
  albumsInCart,
  quantities,
  setAlbumsInCart,
  setQuantities,
  setCartCount,
  setSearchInput,
  setAlbums,
  signedIn,
}) {
  const navigate = useNavigate();
  const [checkout, setCheckout] = useState(false);
  const handleHereClick = () => {
    setSearchInput("");
    setAlbums([]);
  };
  const [purchased, setPurchased] = useState(false);

  if ((!albumsInCart || !quantities || !albumsInCart.length) && !purchased) {
    return (
      <h1 style={{ textAlign: "center" }}>
        No items in cart. Click{" "}
        <Link to="/" style={{ color: "blue" }} onClick={handleHereClick}>
          HERE
        </Link>{" "}
        to search for albums!
      </h1>
    );
  } else if (purchased) {
    return (
      <h1 style={{ textAlign: "center" }}>
        Thank you for your order! As the sole creator of the custom-made
        acrylics, I am dedicated to crafting each item with utmost care and
        attention to detail. Since I handle all aspects of the process,
        including design and production, shipping could take up to{" "}
        <b>2 weeks</b>. Once again, thank you so much for supporting my small
        business, and I'm excited to deliver your album acrylic piece to you
        soon!
      </h1>
    );
  }

  const getOrderById = async (name, option) => {
    const orders = await API.graphql(graphqlOperation(listOrders));
    const matchingOrder = orders.data.listOrders.items.find((order) => {
      return order.album[0].name === name && order.option === option;
    });
    return matchingOrder ? matchingOrder.id : null;
  };

  const handleQuantityChange = async (index, quantity) => {
    setCheckout(false);
    if (!isNaN(quantity) && quantity <= 9 && quantity > 0) {
      const updatedQuantities = [...quantities];
      updatedQuantities[index] = quantity;

      const updatedAlbums = [...albumsInCart];
      updatedAlbums.splice(index, 1, { ...albumsInCart[index], quantity });

      setQuantities(updatedQuantities);
      setAlbumsInCart(updatedAlbums);
      if (signedIn) {
        const matchingOrderId = await getOrderById(
          albumsInCart[index].album.name,
          albumsInCart[index].option
        );

        try {
          await API.graphql(
            graphqlOperation(updateOrder, {
              input: {
                id: matchingOrderId,
                quantity: quantity,
                price: albumsInCart[index].price * quantity,
              },
            })
          );
        } catch (error) {
          console.log("An error occurred while updating the order: ", error);
        }
      }
    } else {
      setQuantities([...quantities]);
      setAlbumsInCart([...albumsInCart]);
    }
  };

  const handleDelete = async (index) => {
    if (signedIn) {
      const orderIdToDelete = await getOrderById(
        albumsInCart[index].album.name,
        albumsInCart[index].option
      );
      try {
        await API.graphql(
          graphqlOperation(deleteOrder, {
            input: {
              id: orderIdToDelete,
            },
          })
        );
      } catch (error) {
        console.log("An error occurred while deleting the order: ", error);
      }
    }
    setCheckout(false);
    const updatedQuantities = [...quantities];
    updatedQuantities.splice(index, 1);
    setQuantities(updatedQuantities);

    const updatedAlbums = [...albumsInCart];
    updatedAlbums.splice(index, 1);
    setAlbumsInCart(updatedAlbums);
    setCartCount(cartCount - 1);
  };

  let subtotal = albumsInCart.reduce(
    (total, album, i) => total + album.price * quantities[i],
    0
  );
  let onlineFees = Number(
    ((subtotal + 4 + 0.49) / 0.9651 - subtotal).toFixed(2)
  );

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: "97%", padding: "0px" }}>
        {albumsInCart.map((album, i) => {
          return (
            <Card key={i} className="mb-2">
              <Card.Body className="d-flex align-items-center">
                <Link
                  to={`/album/${album.album.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/album/${album.album.id}`, {
                      state: {
                        selectedAlbum: album.album,
                      },
                    });
                  }}
                  style={{ color: "black" }}
                >
                  <Card.Img
                    variant="top"
                    src={album.album.images}
                    className="rounded"
                    style={{ width: "175px" }}
                  />
                </Link>
                <div style={{ marginLeft: "10px" }}>
                  <h5 style={{ marginBottom: "0", marginTop: "5px" }}>
                    <strong>{album.album.name}</strong>
                    <span style={{ fontSize: "1rem", marginLeft: "5px" }}>
                      {"by " +
                        album.album.artists
                          .slice(0, 3)
                          .map((artist) => artist.name)
                          .join(", ")}
                      {album.album.artists.length > 3 ? " and more" : ""}
                    </span>
                  </h5>
                  <p style={{ marginBottom: "0" }}>
                    {album.option}: ${album.price * quantities[i]}
                  </p>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(i)}
                    style={{ marginTop: "50px" }}
                  >
                    Delete Item
                  </Button>
                  <Dropdown style={{ marginTop: "5px" }}>
                    <Dropdown.Toggle variant="primary" size="sm">
                      Change Quantity
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {[1, 2, 3, 4, 5].map((number) => (
                        <Dropdown.Item
                          key={number}
                          onClick={() => handleQuantityChange(i, number)}
                        >
                          {number}
                        </Dropdown.Item>
                      ))}
                      <Dropdown.Item>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <span>Custom:</span>
                          <input
                            type="number"
                            min="1"
                            max="10"
                            style={{ width: "50px" }}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) =>
                              handleQuantityChange(i, e.target.value)
                            }
                          />
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </Card.Body>
            </Card>
          );
        })}
        <div className="text-right">
          <h5>
            Subtotal: ${(subtotal + onlineFees).toFixed(2)}{" "}
            <span style={{ fontSize: "12px" }}>
              (shipping fees: ${onlineFees.toFixed(2)})
            </span>
          </h5>
        </div>
        {checkout ? (
          <PayPal
            value={[subtotal, onlineFees]}
            albumsInCart={albumsInCart}
            quantities={quantities}
            setAlbumsInCart={setAlbumsInCart}
            setCartCount={setCartCount}
            setPurchased={setPurchased}
          />
        ) : (
          <Button
            onClick={() => {
              setCheckout(true);
            }}
            style={{ marginBottom: "20px" }}
          >
            Purchase Items
          </Button>
        )}
      </div>
    </div>
  );
}
