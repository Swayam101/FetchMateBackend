const Response = require("../utils/customResponseType");

exports.get404 = (req, res) => {
  const response = new Response(
    "Route Not Found",
    null,
    "Access Denied to this Route"
  );
  res.status(404).json(response);
};

exports.errorHandler = (error, req, res, next) => {
  console.log(`Error Code:${error.message}`);
  if(error.code=="11000") res.status(408).json({message:error.message})
  if(error.name==="ValidationError") {
    const mongooseCustomErrors=[]
    for(field in error.errors) mongooseCustomErrors.push(error.errors[field].message)
    res.status(403).json({message:mongooseCustomErrors[0]})
  }
  else if(error.message=="Invalid Username/Password!") {
    res.status(401).json({message:error.message})
  }
  else if(error.message=="User Not Found!") {
    res.status(401).json({message:error.message})
  }
};