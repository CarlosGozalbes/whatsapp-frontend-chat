export const ACTIONS = {
    INIT_SOCKET:"INIT_SOCKET",
    SET_USER_INFO:"SET_USER_INFO",
    SET_ACTIVE_CHAT:"SET_ACTIVE_CHAT",
    NEW_MESSAGE:"NEW_MESSAGE"
}



export const getUserInfo =(token)=>{
    return async(dispatch)=> {
        try {
            const response = await fetch(
              `${process.env.REACT_APP_BE_LINK}/users/me`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if(response.ok){
                const data = await response.json()
                dispatch({
                    type:ACTIONS.SET_USER_INFO,
                    payload:data
                })
            }
        } catch (error) {
            
        }
    }
}


export const getActiveChat =(token,chatId)=>{
  return async(dispatch)=> {
        try {
            const response = await fetch(
              `${process.env.REACT_APP_BE_LINK}/chat/${chatId}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if(response.ok){
                const data = await response.json()
                dispatch({
                    type:ACTIONS.SET_ACTIVE_CHAT,
                    payload:data
                })
            }
        } catch (error) {
            
        }
    }
}
// export const fetchOpenChats =  () => {
//   return async(dispatch)=> {
//     try {
//     const token = localStorage.getItem("MyToken");
//     let res = await fetch(`${process.env.REACT_APP_BE_LINK}/chat`, {
//       //https://epichat1.herokuapp.com
//       method: "GET",
//       headers: {
//         "Content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     if (res.status !== 200) {
//       // handleOpen();
//       alert("couldnt retrieve the conversations");
//       // setOpen(true);
//     }
//     if (res.ok) {
//       let data = await res.json();
//       console.log(data);
//       dispatch({
//         type: ACTIONS.SET_ACTIVE_CHAT,
//         payload: data,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };}