import CommentsModel from "../models/commentsModel.js";

const commentsController = async (req, res) => {
  console.log("req.body- commentsController: ", req.body);
  // console.log("req.user- commentsController: ", req.user);
  
//   const mentee = await CommentsModel.findByIdAndUpdate(
//     req.body.menteeId,
//     req.body
//   );

  const newComment = new CommentsModel({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    menteeId: req.body.menteeId,
    mentorId: req.body.mentorId,
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
export { commentsController };

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