import React from "react";

import logo from "../../images/logo.png"
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError("");

    // Use Firebase API to sign in
    const firebaseSignInResponse = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAVRTh4axpg-Lk8L-0iy-WXH6V-7OYzrdc",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    const firebaseSignInData = await firebaseSignInResponse.json();

    if (firebaseSignInData.error) {
      setError("Invalid email or password"); // Set a more user-friendly error message
      console.error("Firebase Sign In Error:", firebaseSignInData.error);
      // Handle Firebase sign-in error if needed
    } else {
      // Firebase sign-in successful, now call your local backend
      console.log({ firebaseSignInData });
      const localBackendResponse = await fetch("http://localhost:3001/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idToken: firebaseSignInData.idToken,
        }),
      });

      const localBackendData = await localBackendResponse.json();

      if (localBackendData.error) {
        setError("Local backend login failed"); // Set a more user-friendly error message
        console.error("Local Backend Login Error:", localBackendData.error);
        // Handle local backend login error if needed
      } else {
        // Local backend login successful
        console.log("Local Backend Login Data:", localBackendData);
        // Redirect or perform other actions after successful login
        history("/");
      }
    }
  };


  return (<div className="container mt-5">
    <div className="row">
      <div className="col-md-6 d-flex justify-content-end" style={{ borderRight: '6px solid #749CF2', borderRadius: '20px', marginRight: '10px' }}>
        <img src={logo}
          alt="Company Hero Image"
          className="" style={{ height: '400px' }} />
      </div>

      <div className="col-md-4">
        <div className="card " style={{ background: '#EAEEF3', border: '0.5px solid #749CF2' }}>
          <div className="card-body">
            <h2 className="card-title text-dark text-center">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-dark">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control "
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-dark">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button type="submit" className="btn btn-primary btn-block d-grid gap-3 col-9 mx-auto">
                  Login
                </button>
              </div>
              {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
            </form>
            <div className="text-center">
              <a href="#">Forgot Password?</a>
            </div>
            <hr />
            <div className="text-center">
              <button className="btn btn-danger">Sign up with Google</button>
            </div>
            <p className="mt-3 text-center text-dark">
              Don't have an account? <a href="/signup">Create Account</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;

