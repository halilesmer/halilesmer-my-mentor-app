import { Box, IconButton, Paper } from "@mui/material";
import React, { useState } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const CommentBox = ({
  comment,
  handleDeleteOneComment,
  handleEditCommentClick,
  setCommentId,
}) => {
  console.log("comment: ", comment);

  return (
    <Paper key={comment._id} className="comments-fields" elevation={4}>
      <Box className="comments-cards-img-con">
        {comment?.avatar_picture ? (
          <img
            width="100px"
            className="comments-img"
            src={comment?.avatar_picture}
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
            {comment.first_name} {comment.last_name}
          </p>
          <p className="comments-cards-date">
            {`${new Date(comment.createdAt).toLocaleDateString()} at ${new Date(
              comment.createdAt
            ).getHours()}:${new Date(comment.createdAt).getMinutes()}`}
          </p>
        </div>
        <div className="comments-card-texts-con">
          <p>{comment?.commentText}</p>
        </div>
        <div className="comments-cards-footer">
          <IconButton onClick={() => handleDeleteOneComment(comment)}>
            <DeleteIcon size="small" className="deleteIcon" />
          </IconButton>
          {/* to={`/comments/edit-comment/${comment._id}`} */}

          {/* <IconButton onClick={handleEditCommentClick((e)=> comment)}> */}
          <IconButton onClick={() => handleEditCommentClick(comment)}>
            <EditIcon size="small" className="editIcon" />
          </IconButton>
        </div>
      </Box>
    </Paper>
  );
};

export default CommentBox;
