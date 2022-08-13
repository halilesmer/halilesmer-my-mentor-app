import Mentor from "../model/mentorsModal.js";

const mentorsController = async (req, res) => {
  try {
    const mentors = await Mentor.find();
    res.status(200).json(mentors);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { mentorsController };
