const knex = require("../database/knex")

class NotesControllers {
  async create(request, response) {
    const { title, description, tags, links } = request.body;
    const { user_id } = request.params;

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

    response.json("Nota criada com sucesso!");
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
    const { user_id, title } = request.query;
    
    const notes = await knex("notes")
    .where({ user_id })
    .whereLike("title", `%${title}%`)
    .orderBy("title");

    return response.json(notes);
  }

}

module.exports = NotesControllers;