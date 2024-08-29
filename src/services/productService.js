const Project = require("../Models/project");
const Task = require("../Models/task");
const aqp = require("api-query-params");
module.exports = {
  createProject: async (data) => {
    if (data.type === "EMPTY PROJECT") {
      let result = await Project.create(data);
      return result;
    }
    if (data.type === "ADD-USERS") {
      let myProject = await Project.findById(data.projectId).exec();
      for (let i = 0; i < data.usersArr.length; i++)
        myProject.usersInfor.push(data.usersArr[i]);
      let newResult = await myProject.save();
      console.log(myProject);
      return newResult;
    }
    if (data.type === "ADD-TASKS") {
      let myProject = await Project.findById(data.projectId).exec();
      for (let i = 0; i < data.tasksArr.length; i++)
        myProject.tasks.push(data.tasksArr[i]);
      let newResult = await myProject.save();
      return newResult;
    }
    return null;
  },
  getProject: async (querystring) => {
    const page = querystring.page;

    const { filter, limit, population } = aqp(querystring);
    delete filter.page;
    let offset = (page - 1) * limit;
    result = await Project.find(filter)
      .populate(population)
      .skip(offset)
      .limit(limit)
      .exec();
    return result;
  },
  updateProjectById: async (data) => {
    console.log(">>>>>>>>>>CHECK:", data.id);
    const result = await Project.updateOne(
      { _id: data.id },
      {
        name: data.name,
        description: data.description,
        endDate: data.endDate,
        startDate: data.startDate,
      }
    );
    return result;
  },
  deleteProjectById: async (data) => {
    const result = await Project.deleteById(data.id);
    return result;
  },
  deleteCustomInfor: async (data) => {
    for (let i = 0; i < data.usersArr.length; i++) {
      let ProjectById = await Project.findById(data.projectId).exec();
      ProjectById.usersInfor.pull(data.usersArr[i]);
    }
    const result = await ProjectById.save();
    return result;
  },
};
