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

    response.json();
  }

}

module.exports = NotesControllers;