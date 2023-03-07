import React from 'react'
import { Image,Row } from 'react-bootstrap';
import avatar from "../../../assets/avatar.png";
import './conversation.css'

export default function SingleConversation() {
  return (
    <div>
      <Row  className="d-flex single-conversation-container pl-2">
        <Image
          roundedCircle
          src={avatar}
          width={'10%'}
          height={'10%'}
          className="conversation-list-avatar "
        />
        <div className="d-flex flex-column details-list">
          <div className="d-flex justify-content-between mt-3">
            <span>Nombre Apellido</span>
            <span className="last-message-date  pt-1">friday</span>
          </div>
          <span className="preview-truncate-message">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum laudantium itaque ipsa quisquam enim, voluptate distinctio asperiores, aliquam accusantium eum, fugit corrupti dolore nisi maxime qui excepturi repellat dignissimos harum.
          </span>
        </div>
        {/* <div className="message-without-read align-self-end ml-2 mb-3"> 1 </div> */}
      </Row>
    </div>
  );
}
