const {Router} = require('express');
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const UsersControllers = require("../controllers/usersControllers.js");
const UsersAvatarController = require("../controllers/usersAvatarController.js");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const usersRoutes = Router();
const usersControllers = new UsersControllers();
const usersAvatarController = new UsersAvatarController();
const upload = multer(uploadConfig.MULTER)

usersRoutes.post("/", usersControllers.create);
usersRoutes.put("/", ensureAuthenticated, usersControllers.update);
usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), usersAvatarController.update);

module.exports = usersRoutes;