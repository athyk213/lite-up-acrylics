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
    if (!isNaN(quantity) && quantity <= 9 && quantity > 0) {
      const { id, name, images, artists, release_date } = albumToDisplay;

      addToCart({
        album: {
          id,
          name,
          images: images[0]?.url || images,
          artists: artists.map((artist) => ({
            id: artist.id,
            name: artist.name,
          })),
          release_date,
        },
        price: Number(item.split(": $")[1]),
        option: item.split(": $")[0],
      });
      addToQuantities(quantity);
      navigate(`/cart`);
      if (signedIn) {
        const user = await Auth.currentAuthenticatedUser();
        const userId = user.attributes.sub;
        const orderInput = {
          userId: userId,
          album: {
            id: id,
            name: name,
            images: images[0]?.url || images,
            artists: artists.map((artist) => ({
              id: artist.id,
              name: artist.name,
            })),
            release_date: release_date,
          },
          option: item.split(": $")[0],
          price: Number(item.split(": $")[1]),
          quantity: quantity,
        };

        try {
          await API.graphql(
            graphqlOperation(createOrder, { input: orderInput })
          );
        } catch (error) {
          alert("An error occurred while creating the order: ", error);
        }
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
