import "./comments.css";

import { IconButton, InputAdornment, Paper, TextField } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";

import { AppContext } from "../contexts/appContext";
import { Box } from "@mui/system";
import CommentBox from "./CommentBox";
import SendIcon from "@mui/icons-material/Send";
import { getToken } from "../utils/getToken";

const Comments = (mentorsId) => {
  const [typedComment, setTypedComment] = useState("");
  const [text, setText] = useState("");
  const [commentsData, setCommentsData] = useState(null);
  const token = getToken();
  const { menteesData, getMenteeData, decodedToken } = useContext(AppContext);
  const [openEditField, setOpenEditField] = useState(false);

  const commentsInputFieldRef = useRef(null);

  const scrollToElement = () => {
    if (commentsInputFieldRef.current) {
      commentsInputFieldRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

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

    try {
      const body = {
        first_name: menteesData.first_name,
        last_name: menteesData.last_name,
        menteeId: menteesData.id,
        mentorId: mentorsId.mentorsId,
        avatar_picture: menteesData?.avatar_picture,
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
    scrollToElement();
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
  // console.log("mentorsId: ", mentorsId);
  // console.log("menteesData :>> ", menteesData);
  console.log("commentsData: ", commentsData);

  const handleEditComment = (e) => {
    setOpenEditField(true);
  };

  console.log("commentsInputFieldRef.current: ", commentsInputFieldRef.current);

  return (
    <div className="comments-card-con">
      <h2 className="comment-card-header">{`(${
        commentsData && commentsData.length
      }) READERS COMMENTS`}</h2>
      <div className="comments-card-box">
        {!commentsData && <div className="no-comments">No comments yet...</div>}

        {commentsData &&
          !openEditField &&
          commentsData.map((comment) => {
            return (
              <CommentBox
                key={comment._id}
                comment={comment}
                handleEditComment={handleEditComment}
              />
            );
          })}
      </div>

      {decodedToken.role === "mentee" && (
        <>
          <TextField
            id="outlined-basic"
            className="comments-input-field"
            type="text"
            ref={commentsInputFieldRef}
            multiline
            maxRows={4}
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
        </>
      )}
    </div>
  );
};

export default Comments;
