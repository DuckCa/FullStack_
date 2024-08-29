const Customer = require("../Models/customer");
const aqp = require("api-query-params");
const createCustomerService = async (customerData) => {
  try {
    let result = await Customer.create({
      name: customerData.name,
      address: customerData.address,
      phone: customerData.phone,
      email: customerData.email,
      image: customerData.imageURL,
      description: customerData.description,
      image: customerData.image,
    });
    return result;
  } catch (error) {
    console.log(">>>>>> ERROR CREATE CUSTOME:", error);
    return null;
  }
};
const createArrayCustomerService = async (arr) => {
  try {
    let result = await Customer.insertMany(arr);
    return result;
  } catch (error) {
    console.log(">>>>>> ERROR CREATE CUSTOME:", error);
    return null;
  }
};
const getAllCustomer = async (limit, page, name, querystring) => {
  try {
    let result = null;
    if (limit && page) {
      let offset = (page - 1) * limit;
      const { filter } = aqp(querystring);
      console.log("Check TYPE>>>>>>>>>>>>>>", typeof filter);
      delete filter.page;
      console.log(filter);
      result = await Customer.find(filter).skip(offset).limit(limit).exec();
    } else {
      result = await Customer.find({});
    }
    return result;
  } catch (error) {
    console.log(">>>>>> ERROR Get CUSTOME:", error);
    return null;
  }
};
const updateCustomer = async (req) => {
  try {
    const result = await Customer.updateOne(
      { _id: req.body._id },
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      }
    );
    return result;
  } catch (error) {
    console.log(">>>>>> ERROR Get CUSTOME:", error);
    return null;
  }
};
const deleteCustomer = async (id) => {
  try {
    const result = await Customer.deleteById(id);
    return result;
  } catch (error) {
    console.log(">>>>>> ERROR Delete CUSTOMER:", error);
    return null;
  }
};
const deleteManyCustomer = async (nameArray) => {
  try {
    // Chuyển đổi customersArray thành mảng các chuỗi tên
    let Array = nameArray.map((customer) => customer.name);
    console.log(Array);
    const result = await Customer.deleteMany({ name: { $in: Array } });
    return result;
  } catch (error) {
    console.log(">>>>>> ERROR Delete CUSTOMER:", error);
    return null;
  }
};
module.exports = {
  createCustomerService,
  createArrayCustomerService,
  getAllCustomer,
  updateCustomer,
  deleteCustomer,
  deleteManyCustomer,
};
