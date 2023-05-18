const router = require("express").Router();
const multer=require('multer')

const { protectRoute } = require("../middlewares/authMiddleware");

const storage=multer.diskStorage({
    destination:"./Storage/Images/Pets",
    filename: (req,file,cb)=>{
        cb(null, Date.now().toString()+file.originalname)
    }
})

const pdfStorage=multer.diskStorage({
    destination:"./Storage/PDF",
    filename:(req,file,cb)=>{
        cb(null,Date.now().toString()+file.originalname)
    }
})

const pdfUpload=multer({storage:pdfStorage})

const upload=multer({storage:storage})

const {getAllPets,registerPet,getMyPets,getOnePet, updateMedical}=require('../controller/petController')

router.post("/show-mypets",getMyPets)

router.get("/show-pets", protectRoute, getAllPets);

router.post("/show-one-pet",protectRoute,getOnePet)

router.post("/add-pet",upload.single('medical'),registerPet)

router.post('/update-medical',protectRoute,pdfUpload.single('pdf'),updateMedical);

module.exports = router;
