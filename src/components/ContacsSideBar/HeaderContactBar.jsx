import React, { useEffect, useState } from "react";
import "./headercontactbar.css";
import { Image } from "react-bootstrap";
import avatar1234 from "../../assets/avatar.png";
import { BsThreeDots, BsPlusLg, BsFullscreen, BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";

import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { borderRadius } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useDispatch } from "react-redux";
import { getUserInfo } from "../../redux/actions";
 

export default function HeaderContactBar({ setShowSideBar, showSideBar }) {
  //   const dispatch = useDispatch();
  //  const userInfo = useSelector((state) => state.userInfo);
  const [listOfUsers, setListOfUsers] = useState([]);
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [searchQueryUser, setSearchQueryUser] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openSearchUserDialog, setOpenSearchUserDialog] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClickOpenSearchUserDialog = () => {
    setOpenSearchUserDialog(true);
  };
  const dispatch = useDispatch()
  const handleCloseSearchUserDialog = () => {
    setOpenSearchUserDialog(false);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseOpenSideBar = () => {
    handleClose();
    setShowSideBar(!showSideBar);
  };

  const handleClickOpenDialog = () => {
    handleClose();
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  //redux thing
  const userReduxInformation = useSelector((state) => state.userInfo);
  //

  const fetchSearchUsers = async () => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_BE_LINK}/users/search?username=${searchQueryUser}` //${process.env.REACT_APP_BE_LINK}
      );
      
      if (response.ok) {
        let data = await response.json();
        console.log(data);
        setListOfUsers(data);
      } else {
        console.log("error happened fetching the users");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeSearchQuery = (event) => {
    setSearchQueryUser(event.target.value);
  };

//  useEffect(() => {
//   const token = localStorage.getItem("MyToken");
//   console.log(token)
//   console.log(userReduxInformation);
//   //dispatch(getUserInfo(token));
// }, []); 
  /* useEffect(() => {
    //fetchSearchUsers();
    fetchSearchUsers()
    console.log(listOfUsers);
  }, [searchQueryUser]); */

  const startAConversation = () => {
    console.log(value);
    setValue(null);
  };

  const startAConversationForReal = async (id) => {
    console.log(id)
    const body = {
      recipient: id
    }
    try {
      let res = await fetch(`${process.env.REACT_APP_BE_LINK}/chat`, {
        //https://epichat1.herokuapp.com
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-type": "application/json" },
      });
      if (res.status !== 200) {
        
        alert("couldnt start conversation");
        
      }
      if (res.ok) {
    
        console.log("Successfully started conversation");
      }
    } catch (error) {
      console.log(error)
    }
    handleCloseSearchUserDialog()
    //dispatch(fetchOpenChats());
  }

  return (
    <>
      <header className="header-with-profile d-flex justify-content-between">
        <div className="d-flex">
          <Image
            roundedCircle
            src={
              userReduxInformation?.userInfo?.avatar
                ? userReduxInformation?.userInfo?.avatar
                : avatar1234
            }
            height={50}
            className=" mx-3 my-2"
            style={{ cursor: "pointer" }}
          />{" "}
          <div className="d-flex flex-column mt-3">
            <span>{userReduxInformation.userInfo?.username ? userReduxInformation.userInfo?.username : 'NAME'}</span>
            <span className="userinfo-info">
              {userReduxInformation.userInfo?.info
                ? userReduxInformation.userInfo?.info
                : "Hey there i'm using whatsApp"}
            </span>
          </div>
        </div>
        <div className="header-options align-self-center ml-auto mr-3">
          <BsFullscreen className="mr-4 header-icons" />
          <BsPlusLg
            className="mr-2 header-icons"
            onClick={handleClickOpenSearchUserDialog}
          />
          <Dialog
            open={openSearchUserDialog}
            onClose={handleCloseSearchUserDialog}
          >
            <DialogTitle>Start a conversation</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Start a conversation"
                type="text"
                value={searchQueryUser}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    fetchSearchUsers();
                  }
                }}
                onChange={handleChangeSearchQuery}
                fullWidth
                variant="standard"
              />
              <DialogContentText>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                  }}
                >
                  {listOfUsers &&
                    listOfUsers.map((user) => (
                      <>
                        <ListItem
                          alignItems="flex-start"
                          className="list_item_search_users"
                          style={{ cursor: "pointer" }}
                          key={user._id}
                          onClick={() => startAConversationForReal(user._id)}
                        >
                          <ListItemAvatar>
                            <Avatar
                              alt="Remy Sharp"
                              src={
                                user.avatar
                                  ? user.avatar
                                  : "/static/images/avatar/1.jpg"
                              } //user.avatar
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={user.username} //
                            secondary={
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="span"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {user.info
                                    ? user.info
                                    : "Hey there I'm using whatsApp"}
                                </Typography>
                              </React.Fragment>
                            }
                          />
                        </ListItem>
                        <Divider variant="inset" component="li" />{" "}
                      </>
                    ))}
                </List>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseSearchUserDialog}>Cancel</Button>
            </DialogActions>
          </Dialog>
          {/* <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          style={{ borderRadius: "50%", height: "30px" }}
        >
          <BsThreeDots className="" />
        </Button> */}
          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon style={{ color: "white" }} />
          </IconButton>
        </div>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleCloseOpenSideBar}>My account</MenuItem>
          <MenuItem onClick={handleClickOpenDialog}>Logout</MenuItem>
        </Menu>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Hope to see you soon!"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to disconnect from whatsapp?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>No</Button>
            <Link
              to="/login"
              onClick={() => localStorage.setItem("MyToken", null)}
            >
              <Button
                onClick={() => localStorage.setItem("MyToken", null)}
                autoFocus
              >
                Yes
              </Button>
            </Link>
          </DialogActions>
        </Dialog>
      </header>
      {/* <div className="input-search-contact-container"> */}
      {/* <BsSearch className="ml-4" />
        <input
          type="text"
          placeholder="search a chat or start a new one"
          className="search-contact-input"
        /> */}
      <div className="input-search-contact-container-mui">
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          id="controllable-states-demo"
          options={top100Films}
          getOptionLabel={(option) => option.title}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              startAConversation();
            }
          }}
          renderInput={(params) => (
            <TextField {...params} label="Search in your chats" />
          )}
        />
      </div>
      {/* <Autocomplete
        id="size-small-standard"
        size="small"
        options={top100Films}
        getOptionLabel={(option) => option.title}
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            startAConversation();
          }
        }}
        
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="Start a conversation with"
            placeholder="search user"
          />
        )}
      /> */}

      {/* </div> */}
    </>
  );
}

const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  {
    title: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
  {
    title: "Star Wars: Episode V - The Empire Strikes Back",
    year: 1980,
  },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  {
    title: "The Lord of the Rings: The Two Towers",
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  {
    title: "Star Wars: Episode IV - A New Hope",
    year: 1977,
  },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  {
    title: "Star Wars: Episode VI - Return of the Jedi",
    year: 1983,
  },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  {
    title: "Eternal Sunshine of the Spotless Mind",
    year: 2004,
  },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];
