import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("name", json.username);
      alert("Loggedin Success");
      Navigate("/");
      setEmail("");
      setPassword("");
    } else {
      alert("Invalid Credential");
    }
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const inlineStyles = {
    backgroundImage:
      'url("https://static.cdninstagram.com/rsrc.php/v3/yh/r/IS7e616CiR2.png")',
    backgroundPosition: "0px 0px",
    backgroundSize: "176px 258px",
    width: "175px",
    height: "51px",
    backgroundRepeat: "no-repeat",
    display: "inline-block",
  };
  return (
    <div>
      <div
        className="container mt-5 mb-3"
        style={{ border: "1px solid grey", padding: "30px", maxWidth: "350px" }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <i
            data-visualcompletion="css-img"
            aria-label="Instagram"
            class=""
            role="img"
            style={inlineStyles}
          ></i>
        </div>
        <form
          className="container  justify-content-center"
          style={{ maxWidth: "400px" }}
        >
          <div style={{ marginBottom: "15px", position: "relative" }}>
            <label
              htmlFor="email"
              style={{
                fontSize: "12px",
                position: "absolute",
                top: "3px",
                left: "10px",
                background: "",
                color: "gray",
                padding: "0 5px",
                zIndex: 1,
              }}
            >
              Phone number, username or email address
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                paddingTop: "20px",
                paddingLeft: "15px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px", position: "relative" }}>
            <label
              htmlFor="password"
              style={{
                fontSize: "12px",
                color: "gray",
                position: "absolute",
                top: "3px",
                left: "10px",
                background: "",
                padding: "0 5px",
                zIndex: 1,
              }}
            >
              Password
            </label>

            <input
              type={showPassword ? "text" : "password"}
              minLength={5}
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              style={{
                width: "100%",
                padding: "8px",
                fontSize: "16px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
                paddingTop: "15px",
                paddingLeft: "15px",
              }}
            />

            <button
              type="button"
              onClick={handleTogglePassword}
              style={{
                position: "absolute",
                top: "50%",
                right: "5px",
                transform: "translateY(-50%)",
                fontWeight: "bold",
                background: "white",
                border: "none",
                cursor: "pointer",
                zIndex: 2,
              }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block"
            style={{ width: "100%" }}
            onClick={handleSubmit}
          >
            Log In
          </button>
          <div className="my-4" style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                color: "grey",
                top: "-12px",
                left: "105px",
                background: "white",
                padding: "0 15px",
              }}
            >
              OR
            </div>
            <div style={{ borderBottom: " 1px solid grey" }}></div>
          </div>
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <a
              href="/"
              style={{
                color: "darkblue",
                fontWeight: "bolder",
                textDecoration: "none",
              }}
            >
              <img
                style={{ width: "20px", marginRight: "5px" }}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Facebook_logo_36x36.svg/1200px-Facebook_logo_36x36.svg.png"
                alt=""
              />
              Log in with Facebook
            </a>
          </div>
          <div style={{ textAlign: "center" }}>
            <a href="/" style={{ color: "darkblue", textDecoration: "none" }}>
              Forgotten your password?
            </a>
          </div>
        </form>
      </div>
      <div
        className="container"
        style={{ border: "1px solid grey", padding: "10px", maxWidth: "350px" }}
      >
        <form
          className="container  justify-content-center"
          style={{ maxWidth: "400px" }}
        >
          <div style={{ textAlign: "center", marginTop: "15px" }}>
            <p>
              Don't have an account?{" "}
              <a
                href="/signup"
                style={{ color: "darkblue", textDecoration: "none" }}
              >
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
