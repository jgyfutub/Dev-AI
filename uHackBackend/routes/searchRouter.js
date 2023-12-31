const express = require("express");
const userControllers = require("../controllers/userControllers");
const authControllers = require("../controllers/authControllers");
const searchControllers = require("../controllers/searchControllers");
const router = express.Router();

router.post("/",
  authControllers.protect,
  searchControllers.searchPlant
);


module.exports = router;
