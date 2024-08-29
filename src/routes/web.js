const { Route } = require("express");
const express = require("express");
const router = express.Router();
const {
  getHomepage,
  getDucpage,
  postCreateUser,
  getUpdateUser,
  postUpdateUsers,
  postDeleteUser,
  postHandleDeleteUser,
} = require("../controllers/homeController");
router.get("/", getHomepage);

router.get("/duc", getDucpage);

router.post("/create-users", postCreateUser);
router.get("/update/:id", getUpdateUser);
router.post("/update-user", postUpdateUsers);
router.get("/create", postCreateUser);
router.post("/delete-user/:id", postDeleteUser);
router.post("/delete-user", postHandleDeleteUser);

module.exports = router;
