const { Notification} = require("../../models/Notification");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const notificatons = await Notification.find()
  res.send(notificatons);
});

router.post("/", async (req, res) => {
  const error  = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let notificaton = new Notification({
    subject: req.body.subject,
    message: req.body.message,
  });
  notificaton = await notificaton.save();

  res.send(notificaton);
});

module.exports = router;
