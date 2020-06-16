const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
    return response.status(200).json(repositories)
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body
  const newRepository = {
      id: uuid(),
      title,
      url: `https://github.com/${url}`,
      techs: techs.split(',').map(e => e.trim()),
      likes: 0
  }

  repositories.push(newRepository);

  return response.status(201).json(newRepository);

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  if(!isUuid(id)){
    return response.status(400).json({error: 'Invalid repository ID'});
  }

  const indexRepository = repositories.findIndex(e => e.id == id)

  if(indexRepository < 0){
    return response.status(404).json({error: 'Repository Not Found'})
  }

  repositories[indexRepository].title = title; 
  repositories[indexRepository].url = `https://github.com/${url}`; 
  repositories[indexRepository].techs = techs.split(',').map(e => e.trim()); 

  return response.status(200).json(repositories[indexRepository])

});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  if(!isUuid(id))
    return response.status(400).json({error: 'Invalid repository ID'});

    const indexRepository = repositories.findIndex(e => e.id == id)

    if(indexRepository < 0){
      return response.status(404).json({error: 'Repository Not Found'});
    }

    repositories.splice(indexRepository, 1);

    return response.status(204).send()

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
    const { id } = request.params

    if(!isUuid(id))
        return response.status(400).json({error: 'Invalid repository ID'});

    const indexRepository = repositories.findIndex(e => e.id == id);

    if(indexRepository < 0)
        return response.status(404).json({error: "Repository Not Found"});

    repositories[indexRepository].likes += 1

    response.status(201).json(repositories[indexRepository]);

});

module.exports = app;
