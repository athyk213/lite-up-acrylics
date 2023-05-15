import { useState } from "react";
import {
  InputGroup,
  DropdownButton,
  Dropdown,
  FormControl,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createOrder } from "../graphql/mutations";

export default function Options({
  addToQuantities,
  addToCart,
  albumToDisplay,
  item,
  albumsInCart,
  signedIn,
}) {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("1");
  const [customAmount, setCustomAmount] = useState("");

  let userId = "";

  Auth.currentAuthenticatedUser()
    .then((user) => {
      userId = user.attributes.sub;
    })
    .catch((error) => {
      console.log(error);
    });

  const isInCart = albumsInCart.some(
    (album) =>
      album.album.id === albumToDisplay.id &&
      album.option === item.split(": $")[0]
  );

  const handleDropdownChange = (eventKey) => {
    setSelectedValue(eventKey);
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    const quantity = selectedValue === "custom" ? customAmount : selectedValue;
    const { id, name, images, artists } = albumToDisplay;

    addToCart({
      album: {
        id,
        name,
        images: images[0].url,
        artists,
      },
      price: Number(item.split(": $")[1]),
      option: item.split(": $")[0],
    });
    addToQuantities(quantity);
    navigate(`/cart`);
    if (signedIn) {
      const orderInput = {
        userId: userId,
        album: {
          id: albumToDisplay.id,
          name: albumToDisplay.name,
          images: albumToDisplay.images[0].url,
          artists: albumToDisplay.artists.map((artist) => ({
            id: artist.id,
            name: artist.name,
          })),
        },
        option: item.split(": $")[0],
        price: Number(item.split(": $")[1]),
        quantity: quantity,
      };

      try {
        await API.graphql(graphqlOperation(createOrder, { input: orderInput }));
      } catch (error) {
        console.log("An error occurred while creating the order: ", error);
      }
    }
  };

  return (
    <InputGroup className="dropdown" style={{ marginTop: "20px" }}>
      <InputGroup.Text
        className="dropdown-text"
        style={{ justifyContent: "center" }}
      >
        {item}
      </InputGroup.Text>
      <DropdownButton
        as={InputGroup.Prepend}
        title={selectedValue}
        id="navbarNavDarkDropdown"
        onSelect={handleDropdownChange}
      >
        <Dropdown.Item eventKey="1">1</Dropdown.Item>
        <Dropdown.Item eventKey="2">2</Dropdown.Item>
        <Dropdown.Item eventKey="3">3</Dropdown.Item>
        <Dropdown.Item eventKey="4">4</Dropdown.Item>
        <Dropdown.Item eventKey="5">5</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item eventKey="custom">Custom amount</Dropdown.Item>
      </DropdownButton>
      {selectedValue === "custom" && (
        <FormControl
          placeholder="Enter amount"
          aria-label="Enter amount"
          aria-describedby="basic-addon1"
          onChange={handleCustomAmountChange}
        />
      )}
      <Button className="btn-dark" onClick={handleClick} disabled={isInCart}>
        {isInCart ? "In Cart" : "Add to Cart"}
      </Button>
    </InputGroup>
  );
}
