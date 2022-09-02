import './Chat.css'

import { Button, FormControl, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import React, { useState } from 'react'

import AccountCircle from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";

const Chat = ( ) => {
    const handleSendClick=(e)=>{
        
    }
  return (
    <div className="chat-con">
    <div>No comments yet</div>
      <TextField
        id="outlined-basic"
        className="chat-input-field"
        size="small"
        label="Type for writing"
        variant="outlined"
        autoFocus
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SendIcon onClick={handleSendClick} style={{cursor:'pointer'}}/>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </div>
  );
};

export default Chat