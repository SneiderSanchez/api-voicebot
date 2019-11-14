const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("holaaaaa bienvenido al apartado de watsiton");
});
router.post("/text", async (req, res, next) => {
  let watsonAnswer = "";

  await req.app.locals.service
    .message({
      assistantId: "33022c0d-a730-4b33-b599-d1e65fabdf80",
      sessionId: req.app.locals.session,
      input: {
        message_type: "text",
        text: req.body.text
      }
    })
    .then(res => {
      watsonAnswer = JSON.parse(JSON.stringify(res.result));
    })
    .catch(err => {
      console.log(err);
    });

  res.status(200).json({
    message: "Text Analized ",
    watsonAnswer: watsonAnswer,
    error: false
  });
});



module.exports = router;
