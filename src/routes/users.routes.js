const {Router} = require('express');
const UsersControllers = require("../controllers/usersControllers.js");

const usersRoutes = Router();
const usersControllers = new UsersControllers();

function myMiddleware(request, response, next) {
  if(!request.body.isAdmin) {
    return response.status(401).json({message: 'usuário não autorizado'})
  }
  next()
}

usersRoutes.post("/", myMiddleware, usersControllers.create);

module.exports = usersRoutes;