let user = [];
const conn = require("../config/database");
const User = require("../Models/user");
const {
  uploadSingleFile,
  uploadMultipleFile,
} = require("../services/fileService");
const getUserAPI = async (req, res) => {
  let results = await User.find({});
  return res.status(200).json({
    erroCode: 0,
    data: results,
  });
};
const postCreateUserAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;

  let user = await User.create({
    email: email,
    name: name,
    city: city,
  });
  console.log(">>>>>>User infor:", email, name, city);
  return res.status(200).json({
    EC: 0,
    data: user,
  });
};
const putUpdateUsersAPI = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;
  let userId = req.body.userid;
  let user = await User.updateOne(
    { _id: userId },
    { email: email, name: name, city: city }
  );

  return res.status(200).json({
    EC: 0,
    data: user,
  });
};
const deleteUserAPI = async (req, res) => {
  let userid = req.body.userid;
  let result = await User.deleteOne({ _id: userid });
  return res.status(200).json({
    EC: 0,
    data: result,
  });
};
const postUploadSingleFileAPI = async (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  let result = await uploadSingleFile(req.files.image);
  console.log(">>>>>Check result:", result);
  return res.send("Hello single");
};

const postUploadMultiFileAPI = async (req, res) => {
  let listFile = [];

  if (Array.isArray(req.files.image)) {
    listFile = listFile.concat(req.files.image);
  } else if (req.files.image) {
    listFile.push(req.files.image);
  }

  if (Array.isArray(req.files.picture)) {
    listFile = listFile.concat(req.files.picture);
  } else if (req.files.picture) {
    listFile.push(req.files.picture);
  }

  let result = await uploadMultipleFile(listFile);

  console.log(">>>>>Check result:", result);
  return res.send("Hello single");
};
module.exports = {
  getUserAPI,
  postCreateUserAPI,
  putUpdateUsersAPI,
  deleteUserAPI,
  postUploadSingleFileAPI,
  postUploadMultiFileAPI,
};
