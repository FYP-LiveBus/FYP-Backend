const { Feedback } = require("../../models/Feedback");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const feedbacks = await Feedback.find();
  res.send(feedbacks);
});

router.post("/", async (req, res) => {
  let feedback = new Feedback({
    message: req.body.message,
    rating: req.body.rating,
    // studentID: req.body.studentID
  });

  feedback = await feedback.save();
  res.send(feedback);
});

module.exports = router;
