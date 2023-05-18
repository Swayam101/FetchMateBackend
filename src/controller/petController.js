const Pet = require("../model/PetModel");
const asyncWrapper = require("../utils/asyncWrapper");

exports.getMyPets = asyncWrapper(async (req, res, next) => {
  console.log("Get @ GetMyPets");
  const userId = req.body.id;
  const myPets = await Pet.find({ parentId: userId });
  res.json(myPets);
});

exports.getAllPets = asyncWrapper(async (req, res, next) => {
  const allPets = Pet.find();
  res.json({
    pets: allPets,
    user: req.user,
  });
});

exports.getOnePet = asyncWrapper(async (req, res, next) => {
  const { petId } = req.body;
  console.log(`@Get One Pet ${req}`);
  const pet = await Pet.findById(petId);
  res.status(200).json(pet);
});

exports.registerPet = asyncWrapper(async (req, res, next) => {
  const { name, breed,petType, DOB, parentId} = req.body;
  
  console.log(req.body);

  const newPet = await Pet.create({
    name,
    petType,
    breed,
    DOB,
    parentId,
  });

  res.json({
    pet: newPet,
    message: "Pet Added Sucessfully!",
  });
});

exports.updateMedical = async (req, res, next) => {
  const pdf = req.file.pdf;
  const petID = req.body.id;

  const updated = await Pet.findOneAndUpdate(
    { _id: petID }
  );

  res.json({ message: "Medical Updated Successfully!", updated });
};
