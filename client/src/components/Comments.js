import './comments.css'

import { Button, FormControl, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import React, { useState } from 'react'

import AccountCircle from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";

const Comments = ( ) => {
    const handleSendClick=(e)=>{
        
    }
  return (
    <div className="comments-con">
    <div className='no-comments'>No comments yet...</div>
      <TextField
        id="outlined-basic"
        className="comments-input-field"
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

export default Comments