import { useState } from "react";
import {
  InputGroup,
  DropdownButton,
  Dropdown,
  FormControl,
  Button,
} from "react-bootstrap";
import { useNavigate } from "react-router";

export default function Options({
  addToQuantities,
  addToCart,
  albumToDisplay,
  item,
  albumsInCart,
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

  const handleClick = (e) => {
    e.preventDefault();

    const quantity = selectedValue === "custom" ? customAmount : selectedValue;

    addToCart({
      album: albumToDisplay,
      price: Number(item.split(": $")[1]),
      option: item.split(": $")[0],
    });
    addToQuantities(quantity);
    navigate(`/cart`);
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
