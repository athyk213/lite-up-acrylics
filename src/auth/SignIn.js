import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Auth } from "aws-amplify";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function SignIn({ updateAuthStatus }) {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    try {
      await Auth.signIn(username, password);
      updateAuthStatus(true);
      navigate("/");
    } catch (err) {
      if (err.code === "UserNotFoundException") {
        alert("User not found. Please check your username and try again.");
      } else {
        alert(err);
      }
    }
  };
  return (
    <Container>
      <Row className="px-4 my-5">
        <Col>
          <h1>Login</h1>
        </Col>
      </Row>
      <Row className="px-4 my-5">
        <Col sm={6}>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicText">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter User Name"
                onChange={(evt) => setUserName(evt.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                minLength="8"
                placeholder="Enter Password"
                onChange={(evt) => setPassword(evt.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleLogin}>
              Login &gt;&gt;
            </Button>
            &nbsp;&nbsp;
            <Link to="/register">
              <Button variant="outline-primary">Register</Button>
            </Link>
            &nbsp;&nbsp;
            <Link to="/">
              <Button variant="outline-primary">Cancel</Button>
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
