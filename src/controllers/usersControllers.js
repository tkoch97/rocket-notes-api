const AppError = require("../utils/AppError");

class UsersControllers {
  create(request, response) {
    const {name, email, password} = request.body;

    if(!name){
      throw new AppError("O nome é obrigatório!")
    }

    response.status(201).json({ name, email, password }) // o response.json serve para retornarmos uma resposta do tipo json.
  }
}

module.exports = UsersControllers;