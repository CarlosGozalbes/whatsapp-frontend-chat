//import store

export default function setupConnection(socket) {
  socket.on("connection", () => {
    console.log("connection established!");
  });
  
  socket.on("loggedin", () => {
    console.log("You're correctly logged in now");

    socket.on("new-connection", () => {
      console.log("Another client is connected!");
    });

    
    socket.on("incoming-msg", message => {
        //dispatch NEW_MESSAGE
        
    });



    socket.on("disconnectedUser", () => {
      console.log("Another client is disconnected");
    });
  });

  //socket.on*message........
  // store.dispatch(NEWMESSAGE)
}
