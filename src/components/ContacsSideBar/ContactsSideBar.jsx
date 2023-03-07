import React, { useState } from "react";
import ConversationsList from "./conversationlist/ConversationsList";
import HeaderContactBar from "./HeaderContactBar";
import "./headercontactbar.css";
import avatar123 from "../../assets/avatar.png";
import { Image } from "react-bootstrap";
import { BsPenFill } from "react-icons/bs";
import { useSelector } from "react-redux";

export default function ContactsSideBar() {
  //redux thing
  const userReduxInformation = useSelector((state) => state.userInfo.username ? state.userInfo : "Hey there i'm using whatsapp");
  //

  const [showSideBar, setShowSideBar] = useState(false);
  const [inputUserName, setInputUserName] = useState(
    userReduxInformation.userInfo?.username
  );
  const [inputInfo, setInputInfo] = useState(
    userReduxInformation.userInfo?.info
  );
  const [imageToDisplay, setImageToDisplay] = useState();
  const [selectedPic, setSelectedPic] = useState();
  const MyToken = localStorage.getItem("MyToken");

  const handleEditProfile = async (e) => {
    e.preventDefault();

    const newUserInfo = {
      username: inputUserName,
      info: inputInfo,
    };
    try {
      let res = await fetch(`${process.env.REACT_APP_BE_LINK}/users/me`, {
        //https://epichat1.herokuapp.com
        method: "PUT",
        body: JSON.stringify(newUserInfo),
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${MyToken}`,
        },
      });
      if (res.status !== 200) {
        // handleOpen();
        alert("something went wrong");
        // setOpen(true);
      }
      if (res.ok) {
        //localStorage.setItem("MyToken", accessToken);

        alert("Successfully edit profile!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const [selectedImage, setSelectedImage] = useState(null)

  // const upload = async (e) => {
  //   e.preventDefault()
  //   const formData = new FormData()

  //   formData.append(property, selectedImage)

  //   const options = {
  //     method: "POST",
  //     // headers: {
  //     //   Authorization:
  //     //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWU1MzE4ODczZDVjYjAwMTUzOTVhOWYiLCJpYXQiOjE2NDI0MTAzNzYsImV4cCI6MTY0MzYxOTk3Nn0.qDjDBTYnXI7X3Y3eWLOaKSMaVRFITbDsAwrjjesIIMc",
  //     // },
  //     body: formData,
  //   }
  // let fileReader = new FileReader();
  // const readableImage = fileReader.readAsDataURL(selectedPic);

  const handleChangePic = (e) => {
    setImageToDisplay(URL.createObjectURL(e.target.files[0]));
    setSelectedPic(e.target.files[0]);
  };
  const handleSavePic = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userAvatar", selectedPic);
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_LINK}/users/me/avatar`,
        {
          method: "POST",
          body: formData,
          Authorization: `Bearer ${MyToken}`,
        }
      );

      if (response.ok) {
        alert("Image saved successfully");
        //actualise the redux state
      } else {
        alert("Error uploading image");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (showSideBar) {
    return (
      <>
        <div className="personal-Info">
          <header className="d-flex personal-info-header">
            <span
              onClick={() => setShowSideBar(!showSideBar)}
              style={{ cursor: "pointer", fontSize: "3rem" }}
            >
              &#8592;
            </span>{" "}
            <h4> Profile </h4>
          </header>
          <div className="d-flex justify-content-center py-4">
            <Image
              roundedCircle
              src={
                selectedPic
                  ? imageToDisplay
                  : userReduxInformation.userInfo.avatar
                  ? userReduxInformation.userInfo.avatar
                  : avatar123
              }
              height={250}
              width={250}
              className=" mx-3 my-2"
            />
          </div>
          <div>
            <div className="personal-info-form-container pb-0">
              <label htmlFor="picture" className="mb-0 ">
                <b> Profile picture</b>
              </label>
              <input
                type="file"
                id="picture"
                onChange={(e) => handleChangePic(e)}
                className="inputs-personal-info"
              />
              <button
                className="submit-personal-info"
                onClick={(e) => handleSavePic(e)}
              >
                Save
              </button>
            </div>
            <form onSubmit={handleEditProfile}>
              <div className="personal-info-form-container">
                <label htmlFor="username" className="mb-0 mt-2">
                  <b> User Name</b>
                </label>
                <div>
                  <input
                    type="text"
                    value={inputUserName}
                    onChange={(e) => setInputUserName(e.target.value)}
                    id="username"
                    className="inputs-personal-info"
                  />
                  <BsPenFill className="ml-4" />
                </div>

                <label htmlFor="picture" className="mb-0 mt-2">
                  <b>Info</b>
                </label>
                <div>
                  <input
                    type="text"
                    id="info"
                    className="inputs-personal-info"
                    value={inputInfo}
                    onChange={(e) => setInputInfo(e.target.value)}
                  />
                  <BsPenFill className="ml-4" />
                </div>
                <input
                  type="submit"
                  value="Edit profile"
                  className="submit-personal-info"
                />
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="d-flex flex-column">
        <HeaderContactBar
          setShowSideBar={setShowSideBar}
          showSideBar={showSideBar}
        />

        <ConversationsList />
      </div>
    );
  }
}
