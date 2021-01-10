const { Feedback } = require("../../models/Feedback");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const feedbacks = await Feedback.find().sort({ created_at: -1 });
  res.send(feedbacks);
});

router.post("/", async (req, res) => {
  let feedback = new Feedback({
    message: req.body.message,
    rating: req.body.rating,
    created_at: req.body.created_at,
    // studentID: req.body.studentID
  });

  feedback = await feedback.save();
  res.send(feedback);
});

module.exports = router;
