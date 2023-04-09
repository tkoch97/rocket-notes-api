const express = require('express');

const app = express();
app.use(express.json());

const PORT = 3000;

app.post("/user", (request, response) => { 
  const {name, email, password} = request.body;
  response.json({ name, email, password }) // o response.json serve para retornarmos uma resposta do tipo json.
})
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));