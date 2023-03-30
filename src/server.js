const express = require('express');

const app = express();

const PORT = 3000;

app.get("/message/:id/:user", (request, response) => { //usamos o get como forma de requisição para receber como resposta uma informação do tipo leitura. A parte onde colocamos o "/" é onde colocamos o endereço para qual deve ser enviada a resposta, poderia ser "/pagina-inicial"
  const {id, user} = request.params;
  response.send(`Id da mensagem é: ${id}. Para o usuário: ${user}`) // o response.send pode ser entendido como "a resposta envia: olá mundo".
});

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));