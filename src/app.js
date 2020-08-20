const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  //Listar todos os repositórios
  return response.json(repositories);

});

app.post("/repositories", (request, response) => {
  const {title, url, techs} = request.body;
  const newRepository = {
    id: uuid(), //id: "uuid"
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(newRepository);
  return response.json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const {title, url, techs} = request.body;

  const repo = repositories.find(repo => repo.id === id);
  if(!repo){
    return response.status(400).send();
  }
  
  repo.title = title;
  repo.url = url;
  repo.techs = techs;
  
  return response.json(repo);
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repo = repositories.findIndex(repo => repo.id === id);
  if(repo < 0){
    return response.status(400).send();
  }
  repositories.splice(repo, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repo = repositories.find(repo => repo.id === id);

  if(!repo) {
    return response.status(400).json({ error: 'Repository does not exist.'});
  }
  repo.likes++;

  return response.json(repo);
});

module.exports = app;
