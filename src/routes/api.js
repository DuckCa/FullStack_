const { Route } = require("express");
const express = require("express");
const routerAPI = express.Router();
const {
  getUserAPI,
  postCreateUserAPI,
  putUpdateUsersAPI,
  deleteUserAPI,
  postUploadSingleFileAPI,
  postUploadMultiFileAPI,
} = require("../controllers/apiController");
const {
  postCreatCustomer,
  postCreatArrayCustomer,
  getCustomer,
  putCustomer,
  deleteCustomer,
  deleteArrayCustomer,
} = require("../controllers/customerController");
const {
  postCreateProject,
  getAllProjects,
  updateProjects,
  deleteProjects,
  delCustomInfor,
} = require("../controllers/projectController");
const {
  postCreateTask,
  getAllTask,
  updateTask,
  delTask,
} = require("../controllers/taskController");
routerAPI.get("/", (req, res) => {
  res.status(200).json({
    data: "Hello World with API",
  });
});
routerAPI.get("/Users", getUserAPI);
routerAPI.post("/Users", postCreateUserAPI);
routerAPI.put("/Users", putUpdateUsersAPI);
routerAPI.delete("/Users", deleteUserAPI);
routerAPI.post("/file", postUploadSingleFileAPI);
routerAPI.post("/files", postUploadMultiFileAPI);
routerAPI.post("/customers", postCreatCustomer);
routerAPI.get("/customers", getCustomer);
routerAPI.put("/customers", putCustomer);
routerAPI.post("/customers-many", postCreatArrayCustomer);
routerAPI.delete("/customers-many", deleteArrayCustomer);
routerAPI.delete("/customers", deleteCustomer);
routerAPI.get("/info", (req, res) => {
  return res.status(200).json({
    data: req.query,
    ER: 0,
  });
});
routerAPI.get("/info/:name/:address", (req, res) => {
  return res.status(200).json({
    name: req.params.name,
    address: req.params.address,
    ER: 0,
  });
});
routerAPI.post("/projects", postCreateProject);
routerAPI.get("/projects", getAllProjects);
routerAPI.put("/projects", updateProjects);
routerAPI.delete("/projects/custominfor", delCustomInfor);
routerAPI.delete("/projects", deleteProjects);
routerAPI.post("/tasks", postCreateTask);
routerAPI.get("/tasks", getAllTask);
routerAPI.put("/tasks", updateTask);
routerAPI.delete("/tasks", delTask);

module.exports = routerAPI;
