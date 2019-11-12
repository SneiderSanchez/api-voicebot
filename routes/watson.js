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
  /*   try {
    const allDonantes = await donante.getDonantes();
    res.status(200).json({
      data: allDonantes,
      message: "Donantes listed ",
      error: false
    });
  } catch (err) {
    next(err);
  } */
});

router.post("/add", async (req, res, next) => {
  const donante = new Donante();
  const { nombre } = req.body;
  const { email } = req.body;
  const { contraseña } = req.body;
  const { nombreContacto } = req.body;
  const { telefono } = req.body;
  const { descripcion } = req.body;
  const { direccion } = req.body;
  const { ciudad } = req.body;
  const newDonante = await donante.saveDonante(
    nombre,
    email,
    contraseña,
    nombreContacto,
    telefono,
    descripcion,
    direccion,
    ciudad
  );
  if (newDonante) {
    res.status(200).json({
      message: "New donante Added successfully ",
      error: false
    });
  } else {
    res.status(200).json({
      message: "Error adding donante",
      error: true
    });
  }
});

module.exports = router;
