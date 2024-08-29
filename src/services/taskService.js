const Project = require("../Models/project");
const Task = require("../Models/task");
const aqp = require("api-query-params");
module.exports = {
  createTask: async (data) => {
    if (data.type === "EMPTY-TASK") {
      let result = await Task.create(data);
      return result;
    }
    if (data.type === "ADD-TASK") {
    }
    return null;
  },
  getTask: async (data) => {
    const page = data.page;

    const { filter, limit } = aqp(data);
    delete filter.page;
    let offset = (page - 1) * limit;
    result = await Project.find(filter).skip(offset).limit(limit).exec();
    return result;
  },

  updateTaskById: async (data) => {
    try {
      const result = await Task.updateOne({ _id: data.id }, { ...data });
      return result;
    } catch (error) {
      console.log(">>>>>> ERROR Get TASK:", error);
      return null;
    }
  },
  delTaskById: async (data) => {
    const result = await Task.deleteById(data.id);
    return result;
  },
};
