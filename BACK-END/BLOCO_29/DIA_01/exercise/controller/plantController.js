const defaultPlants = [
  {
    id: 1,
    breed: "Bromelia",
    needsSun: false,
    origin: "Argentina",
    size: 102,
    specialCare: {
      waterFrequency: 3,
    },
  },
  {
    id: 2,
    breed: "Orquidea",
    size: 99,
    needsSun: false,
    origin: "Brazil",
  },
];

let createdPlants = 0;

const initPlant = ({id, breed, needsSun, origin, specialCare, size}) => {
  const waterFrequency = needsSun ? size *  0.77 + (origin === 'Brazil' ? 8 : 7)
    : (size / 2) *  1.33 + (origin === 'Brazil' ? 8 : 7)
  const newPlant = {
    id,
    breed,
    needsSun,
    origin,
    specialCare: {
      waterFrequency,
      ...specialCare,
    },
    size,
  };
  return newPlant;
};

const savePlants = () => {
  const plants = JSON.stringify(defaultPlants);
  localStorage.setItem("plants", plants);
};

const getPlants = (req, res) => {
  return res.status(200).json(defaultPlants);
};

const getPlantById = (req, res) => {
  const  { id } = req.params;

  const searchById = defaultPlants.filter((plant) => plant.id === parseInt(id, 10));

  return res.status(200).json(searchById);
};

const removePlantById = (req, res) => {
  const { id } = req.params;
  const newPlants = defaultPlants.filter((plant) => plant.id !== parseInt(id, 10));
  
  return res.status(200).json(newPlants);
};

const getPlantsThatNeedsSunWithId = (req, res) => {
  const { id } = req.params;

  const filteredPlants = defaultPlants.filter((plant) => {
    if (plant.needsSun && plant.id === parseInt(id, 10)) {
      if (plant.specialCare.waterFrequency > 2) {
        return plant;
      }
    }
  });
  
  return res.status(200).json(filteredPlants);
};

const editPlant = (req, res) => {
  const { id } = req.params;
  const newPlant = req.body

  const result =  defaultPlants.map((plant) => {
    if (plant.id === parseInt(id, 10)) {
      return newPlant;
    }
    return plant;
  });

  return res.status(200).json(result)
};

const createNewPlant = (req, res) => {
  const plant = req.body;

  const mappedPlant = initPlant(plant);
  defaultPlants.push(mappedPlant);

  return res.status(200).json(defaultPlants);
};

module.exports = {
  getPlants,
  getPlantById,
  removePlantById,
  getPlantsThatNeedsSunWithId,
  editPlant,
  createNewPlant,
};