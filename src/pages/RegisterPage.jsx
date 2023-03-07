import React, { useEffect, useState } from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
import whatsapplogo from "./../assets/whatsapp-logo.png";
import { AiFillApple } from "react-icons/ai";
import { FaFacebookSquare, FaGoogle, FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] =useState('')
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault()
    const newUser = {
      email: email,
      password: password,
      userName: userName
    };
    try {
      let res = await fetch(
        `${process.env.REACT_APP_BE_LINK}/users/register`, //https://epichat1.herokuapp.com
        {
          method: "POST",
          body: JSON.stringify(newUser),
          headers: { "Content-type": "application/json" },
        }
      );
      if (res.status !== 200) {
        // handleOpen();
        alert("you you entered wrong password or email");
        // setOpen(true);
      }
      if (res.ok) {
        //let {data} = await res.json();
        /* localStorage.setItem("MyToken", data.token); */
        
        console.log("Successfully registered!");
        alert("Succesfully registered");
        navigate("/login");
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
            <Link to="/login" className="notextdecorationnn ml-4">
              <span className="backtohomepage "> &#8592;</span>
            </Link>
            <Image
              src={whatsapplogo}
              height={70}
              className="m-auto logologin"
            />
          </div>
          <h3 className="ml-4">Create your account</h3>
          <p className="ml-4">Add a strong password to finish it up</p>
          <Row>
            <Col md={6} className="hehehehhehehehhe">
              <form
                onSubmit={handleRegister}
                className="d-flex flex-column mx-4"
              >
                <label htmlFor="username" className="mb-0">
                  <b> User Name</b>
                </label>

                <input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="registerinputs"
                  type="text"
                  id="username"
                  placeholder="user name"
                />
                <label htmlFor="email" className="mb-0 mt-4">
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
                  Register
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
      </div>
    </>
  );
}

export default RegisterPage;
