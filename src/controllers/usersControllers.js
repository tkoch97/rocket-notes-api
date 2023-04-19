class UsersControllers {
  create(request, response) {
    const {name, email, password} = request.body;
    response.status(201).json({ name, email, password }) // o response.json serve para retornarmos uma resposta do tipo json.
  }
}

module.exports = UsersControllers;