const {Router} = require('express');
const NotesControllers = require("../controllers/notesControllers.js");

const notesRoutes = Router();
const notesControllers = new NotesControllers();

notesRoutes.post("/:user_id", notesControllers.create);
notesRoutes.get("/:id", notesControllers.show);

module.exports = notesRoutes;