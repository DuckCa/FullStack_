const {
  createTask,
  getTask,
  updateTaskById,
  delTaskById,
} = require("../services/taskService");

module.exports = {
  postCreateTask: async (req, res) => {
    let result = await createTask(req.body);

    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  getAllTask: async (req, res) => {
    let result = await getTask(req.body);

    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  updateTask: async (req, res) => {
    let result = await updateTaskById(req.body);

    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
  delTask: async (req, res) => {
    let result = await delTaskById(req.body);

    return res.status(200).json({
      EC: 0,
      data: result,
    });
  },
};
