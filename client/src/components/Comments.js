import "./comments.css";

import { IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

import { AppContext } from "../contexts/appContext";
import { Box } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import { getToken } from "../utils/getToken";

const Comments = (mentorsId) => {
  const [typedComment, setTypedComment] = useState("");
  const [text, setText] = useState("");
const [commentsData, setCommentsData] = useState(null);
  const token = getToken();
  const { menteesData, getMenteeData, decodedToken } = useContext(AppContext);

   useEffect(() => {
     getMenteeData();
   }, []);
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
      setText(commentsData);
      getSpecificMentorsComments();
    } catch (error) {
      console.log("error: ", error);
    }

    setTypedComment("");
  };
  // ------- Handle send comments ------- ends //

  // ------- Get mentors comments ------- starts //
  const getSpecificMentorsComments = async (e) => {
    const requestOptions = {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await fetch(
        `http://localhost:5001/api/comments/getSpecificMentorsComments/${mentorsId.mentorsId}`,
        requestOptions
      );
      const comments = await response.json();
      setCommentsData(comments.oneMentorsComments);
      console.log("comments: ", comments.oneMentorsComments);
    } catch (error) {
      console.log("error getting mentors comments: ", error);
    }
  };
  useEffect(() => {
    getSpecificMentorsComments();
  }, []);
  // ------- Get mentors comments ------- ends //

  // console.log("comment text", typedComment);
  console.log("mentorsId: ", mentorsId);
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

  return (
    <div className="comments-card-con">
      <h2 className="comment-card-header">{`(${commentsData && commentsData.length}) READERS COMMENTS`}</h2>
      <div className="comments-card-box">
        {!commentsData && <div className="no-comments">No comments yet...</div>}
        {commentsData &&
          commentsData.map((comment) => {
            return (
              <Paper
                key={comment._id}
                className="comments-fields"
                elevation={4}
              >
                <Box className="comments-cards-img-con">
                  {/* {comments.avatar_picture ? (
                <img
                  width="100px"
                  className="comments-img"
                  src={comments.avatar_picture}
                  alt="avatar"
                />
              ) : (
                <img
                  className="comments-img"
                  width="100px"
                  src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                  alt="avatar"
                />
              )}{" "} */}
                  <img
                    className="comments-img"
                    width="100px"
                    src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
                    alt="avatar"
                  />
                </Box>

                <Box className="comments-card-body">
                  <div className="comments-cards-header">
                    <p className="comments-cards-name">
                      {comment.first_name} {comment.last_name}
                    </p>
                    <div className="comments-cards-date">
                      {`${new Date(
                        comment.createdAt
                      ).toLocaleDateString()} at ${new Date(
                        comment.createdAt
                      ).getHours()}:${new Date(
                        comment.createdAt
                      ).getMinutes()}`}
                    </div>
                  </div>
                  <div className="comments-card-texts-con">
                    <p>{comment?.commentText}</p>
                  </div>
                </Box>

                {/* <div
                className="comments-cards-footer"
                style={{ width: "100%" }}
              ></div> */}
              </Paper>
            );
          })}
      </div>

      {decodedToken.role === "mentee" && (
        <TextField
          id="outlined-basic"
          className="comments-input-field"
          size="small"
          label="Type for writing"
          variant="outlined"
          autoFocus
          autoComplete="off"
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
