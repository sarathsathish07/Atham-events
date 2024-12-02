import React, { useEffect, useState } from "react";
import FormContainer from "../../components/FormContainer";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useAdminLoginMutation } from "../../slices/adminApiSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../slices/adminAuthSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AdminLoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useAdminLoginMutation();
  const { adminInfo } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    if (adminInfo) {
      navigate("/admin");
    }
  }, [adminInfo, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const responseFromApiCall = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...responseFromApiCall }));
      navigate("/admin");
    } catch (error) {
      toast.error("An error occurred, try again");
    }
  };

  return (
    <Container className="event-admin-login-container d-flex justify-content-center align-items-center vh-100" fluid>
          <FormContainer className="event-admin-login-wrapper">
            <h1 className="event-admin-title">Welcome, Admin</h1>
            <p className="event-admin-subtitle">Manage your events effortlessly</p>
            <Form onSubmit={submitHandler} className="event-admin-form">
              <Form.Group controlId="email" className="event-form-group">
                <Form.Label className="event-form-label">Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="event-form-input"
                />
              </Form.Group>

              <Form.Group controlId="password" className="event-form-group">
                <Form.Label className="event-form-label">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="event-form-input"
                />
              </Form.Group>

              <Button type="submit" className="event-form-button" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </Form>
          </FormContainer>
     
    </Container>
  );
}

export default AdminLoginScreen;
