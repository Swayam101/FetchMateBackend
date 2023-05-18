const router = require("express").Router();

const { addPetSitter, acceptRequest,rejectRequest,getOneUser,loginUser ,sendEthers,getNearbyPetSitters,submitRequest} = require("../controller/userController.js");
const { protectRoute } = require("../middlewares/authMiddleware");

router.post("/add", addPetSitter);

router.post("/login",loginUser);

router.post("/one-user",getOneUser);

router.post('/sendEthers',protectRoute,sendEthers)

router.get('/nearby',protectRoute,getNearbyPetSitters)

router.post('/submit-request',protectRoute,submitRequest)

router.post('/accept-request',acceptRequest)

router.post('/reject-request',rejectRequest)

module.exports = router;
