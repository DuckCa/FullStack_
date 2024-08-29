const {
  createProject,
  getProject,
  updateProjectById,
  deleteProjectById,
  deleteCustomInfor,
} = require("../services/productService");

module.exports = {
  postCreateProject: async (req, res) => {
    let result = await createProject(req.body);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  getAllProjects: async (req, res) => {
    let result = await getProject(req.query);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  updateProjects: async (req, res) => {
    let result = await updateProjectById(req.body);
    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  deleteProjects: async (req, res) => {
    let result = await deleteProjectById(req.body);

    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  delCustomInfor: async (req, res) => {
    let result = await deleteCustomInfor(req.body);

    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
};
