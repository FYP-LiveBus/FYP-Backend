const { Notification} = require("../../models/Notification");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const notificatons = await Notification.find()
  res.send(notificatons);
});

router.post("/", async (req, res) => {
    
  let notificaton = new Notification({
    subject: req.body.subject,
    message: req.body.message,
  });
  notificaton = await notificaton.save();

  res.send(notificaton);
});

module.exports = router;
