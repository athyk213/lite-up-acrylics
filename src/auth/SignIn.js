import { useNavigate, Link } from "react-router-dom";

import { Auth } from "aws-amplify";

import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function SignIn({
  updateAuthStatus,
  username,
  password,
  setUsername,
  setPassword,
}) {
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      await Auth.signIn(username, password);
      updateAuthStatus(true);
      navigate("/");
    } catch (err) {
      if (err.code === "UserNotFoundException") {
        alert("User not found. Please check your username and try again.");
      } else if (err.code === "InvalidParameterException") {
        alert("Please enter both your username and your password.");
      } else if (err.code === "UserNotConfirmedException") {
        try {
          await Auth.resendSignUp(username);
          navigate("/validate");
        } catch (error) {
          alert(error);
        }
      } else {
        alert(err.message || err);
      }
    }
  };
  return (
    <Container>
      <Row className="px-4 my-5">
        <Col>
          <h1>Sign In</h1>
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
                onChange={(evt) => setUsername(evt.target.value)}
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
              Sign In &gt;&gt;
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
