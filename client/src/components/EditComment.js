import { Box, IconButton, Paper, TextField } from "@mui/material";
import React, { useState } from "react";

import CancelIcon from "@mui/icons-material/Cancel";
import SaveIcon from "@mui/icons-material/Save";
import { getToken } from "../utils/getToken";

const EditComment = ({
  handleSendClick,
  allComments,
  commentToEdit,
  handleAfterSubmitEditetComment,
  handleCancelClick,
}) => {
  const [changedCommentTxt, setChangedCommentTxt] = useState(
    commentToEdit && commentToEdit.commentText
  );
  const token = getToken();

  const handleSubmitEditedCommentClick = async (e) => {
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        commentText: changedCommentTxt,
        commentId: commentToEdit._id,
      }),
    };
    try {
      const response = await fetch(
        "http://localhost:5001/api/comments/editComment",
        requestOptions
      );

      console.log("response: ", response);
      //  handleSendClick()
      handleAfterSubmitEditetComment();
    } catch (error) {
      console.log("error while edit the comment: ", error);
    }
  };

  console.log("allComments: ", allComments);
  console.log("changedCommentTxt: ", changedCommentTxt);
  console.log("commentToEdit: ", commentToEdit);
  console.log("commentToEdit.commentId: ", commentToEdit._id);

  return (
    <Paper key={commentToEdit._id} className="comments-fields" elevation={4}>
      <Box className="comments-cards-img-con">
        {commentToEdit?.avatar_picture ? (
          <img
            width="100px"
            className="comments-img"
            src={commentToEdit?.avatar_picture}
            alt="avatar"
          />
        ) : (
          <img
            className="comments-img"
            width="100px"
            src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png"
            alt="avatar"
          />
        )}{" "}
      </Box>

      <Box className="comments-card-body">
        <div className="comments-cards-header">
          <p className="comments-cards-name">
            {commentToEdit.first_name} {commentToEdit.last_name}
          </p>
          <p className="comments-cards-date">
            {`${new Date(
              commentToEdit.createdAt
            ).toLocaleDateString()} at ${new Date(
              commentToEdit.createdAt
            ).getHours()}:${new Date(commentToEdit.createdAt).getMinutes()}`}
          </p>
        </div>
        <div className="comments-card-texts-con">
          {/* <p>{commentToEdit?.commentText}</p> */}
          <TextField
            id="changed-text"
            multiline
            maxRows={10}
            minRows={4}
            // placeholder={commentToEdit?.commentText}
            // value={changedCommentTxt ? changedCommentTxt : ''}
            value={changedCommentTxt}
            onChange={(e) => setChangedCommentTxt(e.target.value)}
            type="text"
            style={{ width: "100%", fontStyle: "oblique" }}
          />
        </div>
        <div className="comments-cards-footer">
          <IconButton onClick={handleCancelClick}>
            <CancelIcon
              style={{ color: "#d81c1c" }}
              size="small"
              className="cancelIcon"
            />
          </IconButton>
          <IconButton onClick={handleSubmitEditedCommentClick}>
            <SaveIcon size="small" className="saveIcon" />
          </IconButton>
        </div>
      </Box>
    </Paper>
  );
};

export default EditComment;
