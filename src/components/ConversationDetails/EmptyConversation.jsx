import React from 'react'
import whatsappbackground from './../../assets/whatsappbackground.jpg'
import { Image } from 'react-bootstrap'

export default function EmptyConversation() {
  return (
    <div>
    <Image src={whatsappbackground} className='no_conversation_background' style={{height:'100vh',width:'100%',borderBottom:'3px solid green',objectFit:'cover'}} />
    </div>
  )
}
