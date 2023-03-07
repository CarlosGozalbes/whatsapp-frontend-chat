import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material/styles/createTypography";
import ContactsSideBar from "../components/contactssidebar/ContactsSideBar";
import ConversationDetails from "../components/conversationdetails/ConversationDetails";
import "./mainpage.css";
import EmptyConversation from "../components/conversationdetails/EmptyConversation";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import { getUserInfo } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function MainPage() {
  const [selectedConversation, setSelectedConversation] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const activeChat = useSelector((state) => state.chats.active);
  const userInfo = useSelector((state) => state.chats);
  console.log("UserInfo",userInfo);
  console.log("Active____",activeChat);

  // const user = from the store
  let token = localStorage.getItem("MyToken")
  useEffect(() => {
      if (!token) {
        navigate("/login")} else {dispatch(getUserInfo(token));
          dispatch({ type: "INIT_SOCKET" })
        
        } 
    },
    [navigate] 
  ); 
  ;  

  const socket = useSelector((state) => state.socket);
  
  return (
    <>
    
      
      <Row style={{ maxWidth: "100vw", marginRight: "0px", marginLeft: "0px" }}>
        <Col md={4} className="contacts-side-bar">
          <ContactsSideBar />
        </Col>
        {
          <Col md={8} className="coversation-details">
            {activeChat ? <ConversationDetails /> : <EmptyConversation />}
          </Col>
        }
      </Row>
    </>
  );
}

export default MainPage;
