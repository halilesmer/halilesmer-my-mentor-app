import CommentsModel from "../models/commentsModel.js";

// ---------- Post comments ----------- starts --//
const postComments = async (req, res) => {
  console.log("req.body- postComments: ", req.body);
  // console.log("req.user- postComments: ", req.user);
  const newComment = new CommentsModel({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    menteeId: req.body.menteeId,
    mentorId: req.body.mentorId,
    avatar_picture: req.body.avatar_picture,
    commentText: req.body.commentText,
  });

  try {
    const savedComment = await newComment.save();
    if (res.headersSent !== true) {
      res.status(200).json({
        savedComment,
        msg: "Mentee like update successfull",
      });
    }
  } catch (error) {
    console.log("Error: Can not comments: ", error);
    res.status(401).json({
      msg: "Adding comment is not possible.",
      error: error,
    });
  }
};

// ---------- Update comment ----------- starts --//
const editComment = async (req, res) => {
  console.log("req.body- editComment: ", req.body);

  try {
    if (req.body.commentText) {
      const comment = await CommentsModel.findByIdAndUpdate(
        req.body.commentId,
        { commentText: req.body.commentText }
      );
      res.status(200).json({
        comment,
        msg: "Comment successfully edited!",
      });
    } else {
      res.status(400).json({
        msg: "edit comment failed!! There are not 'commentText' field." + error,
      });
    }
  } catch (error) {
    console.log("error: edit comment failed!!: ", error);
    res.status(400).json({
      msg: "edit comment failed!!:" + error,
    });
  }
  // if (!news) {
  //   throw new ApiError(httpStatus.NOT_FOUND, "News not found");
  // }
};

// ---------- Get specific comments ----------- starts --//
const getSpecificMentorsComments = async (req, res) => {
  console.log("req.params getSpecificMentorsComments:>> ", req.params);

  console.log("req.body - getSpecificMentorsComments: ", req.body);
  console.log("req.user - getSpecificMentorsComments: ", req.user);
  try {
    const oneMentorsComments = await CommentsModel.find({
      mentorId: req.params.mentorsId,
    });
    res.status(200).json({
      oneMentorsComments,
    });
  } catch (error) {
    console.log("error get mentors comments: ", error);
  }
};
export { postComments, getSpecificMentorsComments, editComment };

/* 
const postComment = async (newsId, comment) => {
  const news = await News.findByIdAndUpdate(newsId, {
    $addToSet: { comments: comment },
  });
  if (!news) {
    throw new ApiError(httpStatus.NOT_FOUND, 'News not found');
  }
  return news;
};

const deleteComment = async (newsId, commentId) => {
  const news = await News.findById(newsId);

  if (!news) {
    throw new ApiError(httpStatus.NOT_FOUND, 'News not found');
  }
  news.comments.pull({ _id: commentId })
  news.save()
  return news;
};

*/
