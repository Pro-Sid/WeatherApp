// import express from "express";
// import request from "request";
// import dotenv from "dotenv";
// import serverless from "serverless-http";
const express = require("express");
const request = require("request");
const dotenv = require("dotenv");
const serverless = require("serverless-http");

dotenv.config();
const BASE_URL = "http://api.openweathermap.org/data/2.5/";
const app = express();

const router = express.Router();

app.use('/.netlify/functions/api', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

router.get("/day", (req, res) => {
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

router.get("/nextDay", (req, res) => {
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

app.use('/.netlify/functions/api', router);

module.exports = app;
module.exports.handler = serverless(app);