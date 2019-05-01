const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("orders/list");
});

router.get("/detail", (req, res, next) => {
  res.render("orders/detail");
});

router.get("/list", (req, res, next) => {
  res.render("orders/list");
});

module.exports = router;
