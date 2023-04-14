const {Router} = require('express')

const usersRoutes = Router()

usersRoutes.post("/", (request, response) => { 
  const {name, email, password} = request.body;
  response.json({ name, email, password }) // o response.json serve para retornarmos uma resposta do tipo json.
});

module.exports = usersRoutes;