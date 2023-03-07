import React, { useEffect, useState } from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
import whatsapplogo from './../assets/whatsapp-logo.png'
import "./loginpage.css";
import { Link, useNavigate } from "react-router-dom";
import { AiFillApple } from "react-icons/ai";
import { FaFacebookSquare, FaGoogle, FaGithub } from "react-icons/fa";


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  
  const handleRegister = async (e) => {
    e.preventDefault();
    
    const User = {
      email: email,
      password: password,
    };
    try {
      let res = await fetch(`${process.env.REACT_APP_BE_LINK}/users/login`, {
        //https://epichat1.herokuapp.com
        method: "POST",
        body: JSON.stringify(User),
        headers: { "Content-type": "application/json" },
      });
      if (res.status !== 200) {
        // handleOpen();
        alert("you you entered wrong password or email");
        // setOpen(true);
      }
      if (res.ok) {
        let {accessToken} = await res.json();
        console.log(accessToken, "adsasdasfa");
        localStorage.setItem("MyToken", accessToken);
        
        navigate("/");
        console.log("Successfully logged in!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <div className="loginbackground d-flex flex-column justify-content-center">
        <Container className="containerlogin mb-4">
          <div className="d-flex">
            <Link to="/" className="notextdecorationnn ml-4">
              <span className="backtohomepage "> &#8592;</span>
            </Link>
            <Image
              src={whatsapplogo}
              height={70}
              className="m-auto  logologin"
            />
          </div>
          <h3 className="ml-4">Log in your account</h3>
          <p className="ml-4">Enter your e-mail address and password</p>
          <Row>
            <Col md={6} className="hehehehhehehehhe">
              <form
                onSubmit={handleRegister}
                className="d-flex flex-column mx-4"
              >
                <label htmlFor="email" className="mb-0">
                  <b> Email address</b>
                </label>

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="registerinputs"
                  type="email"
                  id="email"
                  placeholder="Email address"
                />
                <label htmlFor="password" className="mb-0 mt-4">
                  {" "}
                  <b> Password</b>
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="registerinputs"
                  type="password"
                  id="password"
                  placeholder="Password"
                />
                <button
                  type="submit"
                  disabled={!email || !password}
                  className="register-button"
                >
                  Log in
                </button>
              </form>
            </Col>
            <Col md={6}>
              <div className="mx-4">
                <h6>Or logging with</h6>
                <a
                  href={`${process.env.REACT_APP_BE_LINK}/users/googleLogin`}
                  className="text-decoration-none"
                >
                  <div className="mt-1 continue-with-btn links-color">
                    <FaGoogle className="iconssRegister" />
                    Continue with Google
                  </div>
                </a>
                <a
                  href={`${process.env.REACT_APP_BE_LINK}/users/githubLogin`}
                  className="text-decoration-none"
                >
                  <div className="mt-3 continue-with-btn links-color">
                    <FaGithub className="iconssRegister" />
                    Continue with Github
                  </div>
                </a>
                <div className="mt-3 continue-with-btn links-color">
                  <FaFacebookSquare className="iconssRegister" />
                  Continue with Facebook
                </div>
                <div className="mt-3 continue-with-btn links-color">
                  <AiFillApple className="iconssRegister" />
                  Continue with Apple
                </div>
              </div>
            </Col>
          </Row>

          <p className="ml-4 mt-4">
            Reminder: by signing up, you are agreeing to our{" "}
            <a href="">Privacy policy</a> and
            <a href=""> Terms of use</a>.
          </p>
        </Container>
        <Container className="containerlinktoregister">
          <h4 className="mt-4 mb-4">Don't have an account yet?</h4>
          <Link to="/register">
            <button className="createanaccountbutton">Create an Account</button>
          </Link>
        </Container>
      </div>
    </>
  );
}

export default LoginPage;
