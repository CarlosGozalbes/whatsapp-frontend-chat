import React from 'react'
import avatar from "../../assets/avatar.png";
import { Image } from 'react-bootstrap';
import {
  BsThreeDots,
  BsTelephone,
  BsCameraVideo,
  BsSearch,
  BsSlashLg,
} from "react-icons/bs";
export default function HeaderConversation() {
  return (
    <header className="header-conversation-container d-flex justify-content-between pr-4">
      <div>
        <Image
          roundedCircle
          src={avatar}
          height={50}
          className="conversation-list-avatar mx-3 my-2"
        />
        <span>Contact Name</span>
      </div>
      <div className="d-flex mr-4 icons-header-container align-self-center">
        <BsCameraVideo className="contact-icons" />
        <BsTelephone className="contact-icons" />
        <BsSlashLg className="contact-icons separator" />
        <BsSearch className="contact-icons" />
        <BsThreeDots className="contact-icons" />
      </div>
    </header>
  );
}
