import express from "express";
import request from "request";
import dotenv from "dotenv";

dotenv.config();
const BASE_URL = "http://api.openweathermap.org/data/2.5/";
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/day", (req, res) => {
  request(
    {
      url: `${BASE_URL}weather?q=${req.query.city}&appid=${process.env.API_KEY}`,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: error.message });
      }
      res.json(JSON.parse(body));
    }
  );
});

app.get("/nextDay", (req, res) => {
  request(
    {
      url: `${BASE_URL}forecast?q=${req.query.city}&appid=${process.env.API_KEY}`,
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: "error", message: error.message });
      }
      res.json(JSON.parse(body));
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is up at port ${PORT}`);
});
