const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

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

const studentSerach = (req)=>{
  
}
const researcherSearch = (req)=>{

}
exports.searchPlant = catchAsync(async (req,res,next)=>{
    const jsRes = "";
    if(req.user.role == 'student')
      jsRes = studentSerach(req);
    else 
      jsRes = researcherSearch(req);

    res.status(200).json({
      status : 'success',
      data:{
        data : jsRes
      }
    });
    return next();
})