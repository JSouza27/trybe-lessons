const express = require('express');
const controller = require('./controller/plantController');

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/plants', controller.getPlants);
app.get('/plant/:id', controller.getPlantById);
app.delete('/plant/:id', controller.removePlantById);
app.post('/plant/:id', controller.editPlant);
app.post('/plant', controller.createNewPlant);
app.get('/sunny/:id', controller.getPlantsThatNeedsSunWithId);

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
