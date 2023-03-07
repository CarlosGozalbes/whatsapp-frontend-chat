import React, {useState} from 'react'
import './sendmessageinput.css'
import { BsEmojiSmile, BsPaperclip, BsMic } from "react-icons/bs";
import { useDispatch } from 'react-redux';



export default function SendMessageInput() {
    
    const [inputValue, setInputValue] = useState('')
    const dispatch = useDispatch()
    
 
    return (
      <div className="send-message-input-container">
        {/* <Picker
          onEmojiClick={onEmojiClick}
          style={{ visibility: showChosenEmoji ? "visible" : "hidden", zIndex:"2" }}
        /> */}
        <BsEmojiSmile
          className="send-message-icons mr-3"
          
        />{" "}
        <BsPaperclip className="send-message-icons mr-3" />
        <input
          type="text"
          className="send-message-input mr-3"
          value={inputValue}
          onKeyDown={e=> e.key ==='Enter' && dispatch({type:"NEW_MESSAGE", payload:inputValue})}
          onChange={e => setInputValue(e.target.value)}
          placeholder="write a message here"
          
          
        />
        <BsMic className="send-message-icons" />
      </div>
    );
}
