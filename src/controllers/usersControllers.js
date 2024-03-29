const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const UserRepository = require("../repositories/userRepository");
const UserCreateService = require("../services/userCreateService");
const sqliteConnection = require("../database/sqlite");

class UsersControllers {
  async create(request, response) {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute({name, email, password})
  

    return response.status(201).json("Usuário cadastrado com sucesso!");
  }

  async update(request, response) {

    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const database = await sqliteConnection()
    const user = await database.get(`
    SELECT * FROM users WHERE id = (?)
    `, [user_id]);

    if(!user) {
      throw new AppError("Usuário não encontrado.");
    }

    const userEmailUpdated = await database.get(`
    SELECT * FROM users WHERE email = (?)
    `, [email]);

    if(userEmailUpdated && userEmailUpdated.id !== user.id) {
      throw new AppError("Email em uso!");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if(password && !old_password) {
      throw new AppError("É necessário informar a senha antiga");
    }

    if(password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if(!checkOldPassword) {
        throw new AppError("A senha antiga está incorreta");
      }
      
      user.password = await hash(password, 8);
    }

    await database.run(`
    UPDATE users SET
    name = ?,
    email = ?,
    password = ?,
    updated_at = DATETIME('now')
    WHERE id = ?
    `,
    [user.name, user.email, user.password, user_id]
    );

    return response.status(200).json("Usuário atualizado com sucesso!");
  }
}

module.exports = UsersControllers;
