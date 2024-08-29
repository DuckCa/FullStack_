let user = [];
const conn = require("../config/database");
const User = require("../Models/user");
const {
  getAllUsers,
  getUserByID,
  updateUserByID,
  deleteUserByID,
} = require("../services/CRUDServices");
const getHomepage = async (req, res) => {
  let results = await User.find({});

  return res.render("sample.ejs", { listUser: results });
};
const getDucpage = (req, res) => {
  // res.send("Hello Duc!");
  res.render("home.ejs");
};
const postCreateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;

  // let [results, fields] = await conn.query(
  //   `INSERT INTO Users (email, name, city) VALUES (?, ?, ?)`,
  //   [email, name, city]
  // );
  await User.create({
    email: email,
    name: name,
    city: city,
  });
  // await User.create({
  //   email,
  //   name,
  //   city
  // }) Cach viet thu 2 de truyen data

  res.redirect("/");
};
const getUpdateUser = async (req, res) => {
  let id = await req.params.id;
  // let user = await getUserByID(id);
  let user = await User.findById(id);
  return res.render("edit.ejs", { userEdit: user });
};
const postUpdateUsers = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myname;
  let city = req.body.city;
  let userId = req.body.userid;
  await User.updateOne(
    { _id: userId },
    { email: email, name: name, city: city }
  );

  return res.redirect("/");
};
const postDeleteUser = async (req, res) => {
  let userid = req.params.id;
  let user = await User.findById(userid);
  return res.render("Delete.ejs", { userInfor: user });
};
const postHandleDeleteUser = async (req, res) => {
  let userid = req.body.userid;
  let user = await User.deleteOne({ _id: userid });
  return res.redirect("/");
};

//Gửi gmail tự động
// const nodemailer = require('nodemailer');
// export const transporter = nodemailer.createTransport({
// service: 'gmail',
// host: 'smtp.gmail.com
// ',
// port: 587,
// secure: false,
// auth: {
// user: process.env.EMAIL_USERNAME,
// pass: process.env.EMAIL_PASSWORD,
// },
// });
module.exports = {
  getHomepage,
  getDucpage,
  postCreateUser,
  getUpdateUser,
  postUpdateUsers,
  postDeleteUser,
  postHandleDeleteUser,
};
