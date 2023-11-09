import React from "react";
import { useState } from "react";
import logo from "../../images/logo.png";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Male");
  const [error, setError] = useState("");
  const history = useNavigate();
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError("");

    console.log("😂😂", gender)

    // Perform validation if needed

    // Make a signup request
    const signUpResponse = await fetch("http://localhost:3001/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email,
        password,
        phoneNumber,
        dob,
        gender,
      }),
    });

    const signUpData = await signUpResponse.json();
    console.log({signUpData})

    if (signUpData.result && signUpData.result.errors) {
      console.error("Signup Error:", signUpData.result.errors);

      const serializedErros = signUpData.result.errors.map(error => error.path + ':' + error.msg);
      setError(serializedErros.join('\n')); // Set error message for display
    } else if(signUpData.error){
      console.error("Signup Error:", signUpData.error);

      setError(signUpData.error);
    }else {
      // Signup successful, you can redirect or perform other actions
      console.log("Signup Data:", signUpData);

       history("/Login");
      
    }
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div
          className="col-md-6 d-flex justify-content-end"
          style={{ borderRight: '6px solid #749CF2', borderRadius: '20px', marginRight: '10px' }}
        >
          <img
            src={logo}
            alt="Company Hero Image"
            className=""
            style={{ height: '400px' }}
          />
        </div>
        <div className="col-md-4">
          <div className="card" style={{ background: '#EAEEF3', border: '0.5px solid #749CF2' }}>
            <div className="card-body">
              <h2 className="card-title text-dark text-center">Sign Up</h2>
              <form onSubmit={handleSignUp}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label text-dark">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-dark">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
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
                  <label htmlFor="dob" className="form-label text-dark">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="gender" className="form-label text-dark">
                    Gender
                  </label>
                  <select 
                  className="form-select" 
                  id="gender" 
                  value={gender}
                  onChange={(e)=>{
                    console.log(e.target.value)
                    setGender(e.target.value);
                  }}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label text-dark">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <button
                    type="submit"
                    className="btn btn-primary btn-block d-grid gap-3 col-9 mx-auto"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
              <p className="mt-3 text-center text-dark">
                Already have an account? <a href="#">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
