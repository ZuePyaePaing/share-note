const express = require("express");
const authControllers = require("../controllers/auth.controllers");
const routes = express.Router();

routes.post("/register", authControllers.register);

module.exports = routes;
