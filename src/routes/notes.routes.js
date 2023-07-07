const {Router} = require('express');
const NotesControllers = require("../controllers/notesControllers.js");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const notesRoutes = Router();
const notesControllers = new NotesControllers();

notesRoutes.use(ensureAuthenticated);

notesRoutes.post("/", notesControllers.create);
notesRoutes.get("/:id", notesControllers.show);
notesRoutes.delete("/:id", notesControllers.delete);
notesRoutes.get("/", notesControllers.index);

module.exports = notesRoutes;