const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/diskStorage");

class UsersAvatarController {
  async update(request, response) {
    const user_id = request.user.id;
    const avatarFileName = request.file.filename;
    const diskStorage = new DiskStorage();

    const user = await knex("users")
    .where({ id: user_id }).first();

    if(!user) {
      throw new AppError("Somente usuários autenticados têm acesso a essa função", 401)
    }

    if(user.avatar) {
      await diskStorage.deleteFile(user.avatar);
    }

    const newAvatar = await diskStorage.saveFile(avatarFileName);
    user.avatar = newAvatar;

    await knex("users").update(user).where({ id: user_id });

    return response.json(user);

  }

}

module.exports = UsersAvatarController;