import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button, Alert } from "@mui/material";
import { Link } from "react-router-dom";
import { signUp } from "../firebase";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]{3,}$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\d][\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; 
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      setTimeout(() => setError(""), 2000)
      return;
    }

    if (!validateName(name)) {
      setError(
        "Name must be at least 3 letters long and cannot contain numbers."
      );
      setTimeout(() => setError(""), 2000)
      return;
    }

    if (!validateEmail(email)) {
      setError("Email must not start with a number and must be valid.");
      setTimeout(() => setError(""), 2000)
      return;
    }

    if (!validatePassword(password)) {
      setError("Password must be at least 6 characters long.");
      setTimeout(() => setError(""), 2000)
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setTimeout(() => setError(""), 2000)
      return;
    }

    try {
      await signUp(name, email, password);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError("Failed to register. Please try again.");
      setTimeout(() => setError(""), 2000)
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Register
        </Typography>

        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Enter Your Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Enter Your Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
          >
            Register
          </Button>
          <Typography>
            Existing User ?{" "}
            <Link
              to={"/login"}
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              Login
            </Link>
          </Typography>
        </form>
      </Paper>
    </Container>
  );
}

export default Register;
