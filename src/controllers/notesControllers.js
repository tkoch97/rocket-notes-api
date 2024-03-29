const knex = require("../database/knex")

class NotesControllers {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const user_id = request.user.id;

    const [ note_id ] = await knex("notes").insert({
      title,
      description,
      user_id
    })
    
    const linksInsert = links.map(link => {
      return {
        url: link,
        note_id
      }
    });
    
    await knex("links").insert(linksInsert);
    
    const tagsInsert = tags.map(name => {
      return {
        name,
        note_id,
        user_id
      }
    });
    
    await knex("tags").insert(tagsInsert);

    return response.json("Nota criada com sucesso!");
  }

  async show(request, response) {
    const { id } = request.params;

    const note = await knex("notes").where({ id }).first();
    const tags = await knex("tags").where({ note_id: id }).orderBy("name");
    const links = await knex("links").where({ note_id: id }).orderBy("created_at");

    return response.json({
      ... note,
      tags,
      links
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("notes").where({ id }).delete();

    return response.json(`Nota deletada com sucesso!`)
  }

  async index(request, response) {
    const { title, tags } = request.query;
    const user_id = request.user.id;

    let notes;

    if(tags) {

      const filteredTags = tags.split(',').map(tag => tag.trim());

      notes = await knex("tags")
      .select([
        "notes.id",
        "notes.title",
        "notes.description",
        "notes.user_id",
        "notes.created_at",
        "notes.updated_at"
      ])
      .where("notes.user_id", user_id)
      .whereLike("notes.title", `%${title}%`)
      .whereIn("tags.name", filteredTags)
      .innerJoin("notes", "notes.id", "tags.note_id")
      .orderBy("notes.created_at")

    } else {
      notes = await knex("notes")
      .where({ user_id })
      .whereLike("title", `%${title}%`)
      .orderBy("created_at");
    }

    const userTags = await knex("tags").where({ user_id });
    const notesWithTags = notes.map(note => {
      const noteTags = userTags.filter(tag => tag.note_id === note.id);

      return {
        ...note,
        tags: noteTags
      }
    });

    return response.json(notesWithTags);
  }

}

module.exports = NotesControllers;