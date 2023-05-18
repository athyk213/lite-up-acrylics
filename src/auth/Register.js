import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { Auth } from "aws-amplify";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function Register() {
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleRegister = async () => {
    try {
      await Auth.signUp({
        username: username,
        password: password,
        attributes: {
          email: email,
        },
      });
      navigate("/validate");
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Container>
      <Row className="px-4 my-5">
        <Col>
          <h1>Register</h1>
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
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(evt) => setEmail(evt.target.value)}
              />
              <Form.Text className="text-muted">
                We'll never share your email!
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                minLength="8"
                placeholder="Enter Password"
                onChange={(evt) => setPassword(evt.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={handleRegister}>
              Register &gt;&gt;
            </Button>
            &nbsp;&nbsp;
            <Link to="/login">
              <Button variant="outline-primary">Sign In</Button>
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
