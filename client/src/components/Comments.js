import "./comments.css";

import { InputAdornment, TextField } from "@mui/material";
import React, { useContext, useState } from "react";

import { AppContext } from "../contexts/appContext";
import SendIcon from "@mui/icons-material/Send";
import { getToken } from "../utils/getToken";

const Comments = (mentorsId) => {
  const [typedComment, setTypedComment] = useState("");
  const [text, setText] = useState("");
  const [commentData, setCommentData] = useState(null);
  const token = getToken();
  const { menteesData, getMenteeData, decodedToken } = useContext(AppContext);


 
 // ------- Sending comments by pressing 'Enter' button ------- //
  const onKeyUp = (e) => {
    if (typedComment.trim()) {
      if (e.key === "Enter") {
        handleSendClick();
      }
    }
  };

  // ------- Handle send comments ------- starts //
  const handleSendClick = async (e) => {
   await getMenteeData();
    console.log("menteesData :>> ", menteesData && menteesData);

    try {
      const body = {
        first_name: menteesData.first_name,
        last_name: menteesData.last_name,
        menteeId: menteesData.id,
        mentorId: mentorsId.mentorsId,
        commentText: typedComment,
      };
      const requestOptions = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      };
      const response = await fetch(
        "http://localhost:5001/api/comments",
        requestOptions
      );
      const result = await response.json();

      console.log("result", result);
      setText(commentData);
    } catch (error) {
      console.log("error: ", error);
    }

    setTypedComment("");
  };
  // ------- Handle send comments ------- ends //

  // console.log("comment text", typedComment);
  // console.log("mentorsId: ", mentorsId);
  // console.log('menteesData :>> ', menteesData);
  // console.log(
  //   "body:",
  //   "first_name:",
  //   menteesData.first_name,
  //   "last_name:",
  //   menteesData.last_name,
  //   "menteeId:",
  //   menteesData.id,
  //   "mentorId:",
  //   mentorsId.mentorsId,
  //   "commentText:",
  //   typedComment
  // );
  console.log("decodedToken: ", decodedToken);



  return (
    <div className="comments-con">
      {!commentData && <div className="no-comments">No comments yet...</div>}

      {decodedToken.role === "mentee" && (
        <TextField
          id="outlined-basic"
          className="comments-input-field"
          size="small"
          label="Type for writing"
          variant="outlined"
          autoFocus
          onKeyUp={onKeyUp}
          value={typedComment}
          onChange={(e) => setTypedComment(e.currentTarget.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SendIcon
                  onClick={handleSendClick}
                  style={{ cursor: "pointer" }}
                />
              </InputAdornment>
            ),
          }}
        ></TextField>
      )}
    </div>
  );
};

export default Comments;
