const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const plantFile = require('./../public/PlantData.json')
const allPlantData = plantFile.map((i,obj,arr)=>{
    return obj;
});

// module.exports = function verifylogin(username,password)
// {
//     const useracc = allAccountsobj.find(function(useraccs){
//         if(useraccs.owner === username)
//             return true;
//         return undefined;
//     })
//     if(!useracc || useracc.pin != Number(password))
//         return undefined;
//     return useracc;
// }

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) cb(null, true);
  else cb(new AppError("Please upload image only", 404), false);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.userPhotoUpload = upload.single("searchImage");

exports.userPhotoReOrg = (req, res, next) => {
  if (!req.file) return next();
  const ext = req.file.originalname.substr(req.file.originalname.lastIndexOf('.'))
  req.file.filename = `${req.user._id}${ext}`;
  const filePath = path.join(process.env.PRODUCT_IMAGE_LOCATION,req.file.filename);
  sharp(req.file.buffer)
    .resize(500, 500, { fit: "fill" })
    .toFile(filePath);

  next();
};

exports.searchPlant = catchAsync(async (req,res,next)=>{
    const jsRes = {plantName : req.plantName};
    const plantData = allPlantData.filter(plant=>{
      if(plant.plantName == req.plantName) return true;
      return false;
    })
    plantData = plantData && plantData[0].Links;
    if(req.user.role == 'student');
    else 
      jsRes.links = plantData;

    res.status(200).json({
      status : 'success',
      data:{
        data : jsRes
      }
    });
    return next();
})