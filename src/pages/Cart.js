import {
  Row,
  Card,
  ListGroup,
  Button,
  Dropdown,
  Col,
  Table,
} from "react-bootstrap";
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
      <h1 style={{ textAlign: "center" }}>Thank You For Your Purchase!</h1>
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
  let onlineFees = Number((subtotal * 0.0349 + 0.49).toFixed(2));

  let description = albumsInCart
    .map(
      (album, i) => `${album.option}: ${album.album.name} x ${quantities[i]}`
    )
    .join("\n");

  return (
    <div>
      <Row>
        <Col className="col-md-8" style={{ width: "70%", marginLeft: "1.5%" }}>
          <Row className="row-cols-4">
            {albumsInCart.map((album, i) => {
              return (
                <Card key={album.album.id} className="mb-2">
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
                      className="mt-2 rounded"
                    />
                    <Card.Body
                      className="text-center"
                      style={{ height: "150px" }}
                    >
                      <Card.Title
                        style={{
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          maxWidth: "100%",
                        }}
                      >
                        {album.album.name}
                      </Card.Title>
                      <Card.Text>
                        {album.album.artists
                          .slice(0, 3)
                          .map((artist) => artist.name)
                          .join(", ")}
                        {album.album.artists.length > 3 ? "and more" : ""}
                      </Card.Text>
                      <Card.Text>
                        {album.option}: ${album.price * quantities[i]}
                      </Card.Text>
                    </Card.Body>
                  </Link>

                  <ListGroup className="list-group-flush text-center">
                    <ListGroup.Item>Quantity: {quantities[i]}</ListGroup.Item>
                  </ListGroup>
                  <Card.Footer className="text-center">
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(i)}
                    >
                      Delete Item
                    </Button>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant="primary"
                        size="sm"
                        style={{ marginTop: "10px" }}
                      >
                        Change Quantity
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() => handleQuantityChange(i, 1)}
                        >
                          1
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleQuantityChange(i, 2)}
                        >
                          2
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleQuantityChange(i, 3)}
                        >
                          3
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleQuantityChange(i, 4)}
                        >
                          4
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleQuantityChange(i, 5)}
                        >
                          5
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <span style={{ marginRight: "5px" }}>Custom:</span>
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
                  </Card.Footer>
                </Card>
              );
            })}
          </Row>
        </Col>
        <Col style={{ width: "30%", marginRight: "0.9%" }}>
          <Table striped bordered>
            <thead style={{ textAlign: "center" }}>
              <tr>
                <th>Album</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {albumsInCart.map((album, i) => {
                return (
                  <tr>
                    <td>
                      <strong>{album.option}:</strong> {album.album.name}
                    </td>
                    <td>{quantities[i]}</td>
                    <td>${album.price * quantities[i]}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <div className="text-right">
            <h5 style={{ paddingBottom: "5%" }}>
              Subtotal: ${(subtotal + onlineFees).toFixed(2)}
              {"  "}
              <span style={{ fontSize: "12px" }}>
                (online payment fees: ${onlineFees})
              </span>
            </h5>
          </div>
          {checkout ? (
            <PayPal
              value={subtotal + onlineFees}
              description={description}
              setAlbumsInCart={setAlbumsInCart}
              setCartCount={setCartCount}
              setPurchased={setPurchased}
            />
          ) : (
            <Button
              onClick={() => {
                setCheckout(true);
              }}
            >
              Purchase Items
            </Button>
          )}
        </Col>
      </Row>
    </div>
  );
}
