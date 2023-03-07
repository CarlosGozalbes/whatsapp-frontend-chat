import React from 'react'
import HeaderConversation from './HeaderConversation'
import './conversationdetailsstyle.css'
import Conversation from './Conversation'
import SendMessageInput from './SendMessageInput'
export default function ConversationDetails() {
  return (
    <>
    <HeaderConversation/>
    {<div className='conversation-container'>
    <Conversation/>
    </div>}
    <SendMessageInput/>
    </>
  )
}
