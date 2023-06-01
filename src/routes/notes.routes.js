const {Router} = require('express');
const NotesControllers = require("../controllers/notesControllers.js");

const notesRoutes = Router();
const notesControllers = new NotesControllers();

notesRoutes.post("/:user_id", notesControllers.create);
notesRoutes.get("/:id", notesControllers.show);
notesRoutes.delete("/:id", notesControllers.delete);
notesRoutes.get("/", notesControllers.index);

module.exports = notesRoutes;