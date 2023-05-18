const bcrypt = require("bcrypt");

const sib = require("sib-api-v3-sdk");

const jwt = require("jsonwebtoken");

const { signAccessToken } = require("../utils/jwtTokens");
const User = require("../model/UserModel");
const Response = require("../utils/customResponseType");
const emailHtml = require("../utils/emailHtml");
const asyncWrapper = require("../utils/asyncWrapper");
const sendEther = require('../utils/sendEthers')

const SibApiV3Sdk = require('sib-api-v3-sdk');
SibApiV3Sdk.ApiClient.instance.authentications['api-key'].apiKey = process.env.SIB_API_KEY;


exports.addPetSitter = asyncWrapper(async (req, res) => {
  const { firstName,lastName,email, birthDate, password, state,city, country, phone, role, sex } =
    req.body;
    console.log(req.body);

    const name=`${firstName} ${lastName}`

  const hashedPassword = await bcrypt.hash(password, 2);


  const newUser = await User.create({
    name,
    email,
    city,
    phone,
    country,
    birthDate,
    role,
  state,
    password: hashedPassword,
    sex,
  });

  console.log(`User Added`);
  res.status(201).json({message:"Registered Successfully!",user:newUser});

});

exports.loginUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;


  const user = await User.findOne({ email });
  
  if (!user) throw new Error("User Not Found!");

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) throw Error("Invalid Username/Password!");

  const accessToken = await signAccessToken(user.id);
  const responseUser = await User.findOne({ email }).select([
    "-password",
  ]);

  req.user = responseUser;
  res.json({ accessToken, responseUser });
});


exports.sendEthers = asyncWrapper(async (req, res, next) => {
  const reciever = req.body.reciever
  sendEther(reciever);
  res.json("Ethers Send SuccessFully!")
})

exports.getNearbyPetSitters=asyncWrapper(async (req,res,next)=>{
 const nearbyLovers= await User.find({role:{$in:["PetLover","Both"]}})
  res.json(nearbyLovers)
})

exports.getCurrentRequests=()=>{

}

exports.submitRequest=asyncWrapper(async (req,res,next)=>{
  const {parentId,pet,petSitterCode}=req.body
  console.log(`Req Body :${req.body.parentId}`);

  const submittedRequest=await User.findByIdAndUpdate({_id:petSitterCode},{currentRequests:{
    petParent:parentId,
    pet:pet,
    status:"Pending"
  }})

  console.log(submittedRequest);
})

exports.getOneUser=asyncWrapper(async (req,res,next)=>{
  const {userId}=req.body
  console.log(req.body);
  const user=await User.findById(userId)
  console.log(user);
  res.json(user)
})

exports.acceptRequest=asyncWrapper(async (req,res,next)=>{
  const {id}=req.body
  const currentUser=await User.findById(id)
  const currentRequest=currentUser.currentRequests
  currentRequest.status="Accepted"
  const updated=await User.findByIdAndUpdate(id,{currentRequests:currentRequest})
  console.log(updated);
})

exports.rejectRequest=asyncWrapper(async (req,res,next)=>{
  const {id}=req.body
      const currentUser=await User.findById(id)
      const currentRequest=currentUser.currentRequests
      currentRequest.status="Rejected"
      const updated=await User.findByIdAndUpdate(id,{currentRequests:currentRequest})
      console.log(updated);
})


