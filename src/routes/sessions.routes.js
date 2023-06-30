const { Router } = require("express");
const SessionsControlers = require ("../controllers/sessionsControlers.js")

const sessionsRoutes = Router();
const sessionsControlers = new SessionsControlers();

sessionsRoutes.post("/", sessionsControlers.create);

module.exports = sessionsRoutes;