require("dotenv").config();
const config = {
  port: process.env.PORT,
  version: process.env.VERSION,
  apikey: process.env.APIKEY,
  url: process.env.URL,
  assistantId: process.env.ASSISTANTID
};

module.exports = config;
