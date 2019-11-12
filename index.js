const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").Server(app);
const { port, assistantId, version, apikey, url } = require("./config");
const watsonRouter = require("./routes/watson");
const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");
app.use(bodyParser.json());

const server = http.listen(port, () =>
  console.log(`Listening on http://localhost:${server.address().port}`)
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  getSession();
  next();
});
const service = new AssistantV2({
  version: version,
  authenticator: new IamAuthenticator({
    apikey: apikey
  }),
  url: url
});
app.locals.service = service;
service
  .createSession({
    assistantId: assistantId
  })
  .then(res => {
    console.log("Watson Session Created");
    app.locals.session = res.result.session_id;
    return;
  })
  .catch(err => {
    console.log(err);
  });

var getSession = () => {};
app.use("/api/Watson", watsonRouter);
