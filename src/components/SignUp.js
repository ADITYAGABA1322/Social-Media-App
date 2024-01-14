import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const Navigate = useNavigate();
  const handleclick = async (e) => {
    const { name, email, password } = user;
    e.preventDefault();
    const response = await fetch("http://localhost:4000/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.authtoken) {
      //Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      localStorage.setItem("name", name);
      alert("Registered Success");
      Navigate("/");
    } else {
      alert(
        "User with email/username already exists or password is not of min 5 length"
      );
    }
  };
  const onchange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
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
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h6 style={{ color: "grey", font: "bolder" }}>
            Sign Up to see photos and videos{" "}
          </h6>
          <h6 style={{ color: "grey", font: "bolder" }}>from your friends.</h6>
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
              Mobile number or email address
            </label>

            <input
              type="email"
              id="email"
              name="email"
              value={user.email}
              onChange={onchange}
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
              userName
            </label>

            <input
              type="name"
              id="name"
              name="name"
              value={user.name}
              onChange={onchange}
              required
              minLength={5}
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
              id="password"
              name="password"
              value={user.password}
              onChange={onchange}
              minLength={5}
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
            onClick={handleclick}
          >
            SignUp
          </button>
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
              Have an account?{" "}
              <a
                href="/login"
                style={{ color: "darkblue", textDecoration: "none" }}
              >
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
