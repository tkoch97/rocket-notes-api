const {Router} = require('express');
const UsersControllers = require("../controllers/usersControllers.js");

const usersRoutes = Router();
const usersControllers = new UsersControllers();

usersRoutes.post("/", usersControllers.create);

module.exports = usersRoutes;