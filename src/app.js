const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;
  const newRepository = {
      id: uuid(),
      title,
      url,
      techs,
      likes: 0
  }

  repositories.push(newRepository);

  return response.json(newRepository);

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repository = repositories.find(e => e.id == id);

  if(!repository){
      return response.status(400).json(400);
  }

  repository.title = title; 
  repository.url = url; 
  repository.techs = techs; 

  return response.status(200).json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

    const indexRepository = repositories.findIndex(e => e.id == id);

    if(indexRepository < 0){
        return response.status(400).json(400);
    }

    repositories.splice(indexRepository, 1);

    return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
    const { id } = request.params;
    const repository = repositories.find(e => e.id === id);

    if(!repository){
        return response.status(400).json(400);
    }
  
    repository.likes += 1

    response.status(201).json(repository);

});

module.exports = app;
