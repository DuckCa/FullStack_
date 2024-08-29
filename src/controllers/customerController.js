const { uploadSingleFile } = require("../services/fileService");
const {
  createCustomerService,
  createArrayCustomerService,
  getAllCustomer,
  updateCustomer,
  deleteCustomer,
  deleteManyCustomer,
} = require("../services/customerService");
const aqp = require("api-query-params");
const Joi = require("joi");

module.exports = {
  postCreatCustomer: async (req, res) => {
    let { name, address, phone, email, image, description } = req.body;
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),

      address: Joi.string(),

      phone: Joi.string().pattern(new RegExp("^[0-9]{8,11}$")),

      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),

      description: Joi.string(),

      email: Joi.string().email(),
    });
    const { error } = schema.validate(req.body, { abortEarly: false }); //Với abortEarly: false Tất cả các lỗi trong đối tượng sẽ được trả về, không chỉ lỗi đầu tiên.

    return res.status(200).json({
      msg: error,
    });

    let imageURL = "";
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send("No files were uploaded.");
    } else {
      let result = await uploadSingleFile(req.files.image);
      imageURL = result.path;
    }
    let customerData = {
      name,
      address,
      phone,
      email,
      image,
      description,
      image: imageURL,
    };
    let customer = await createCustomerService(customerData);
    // name: { type: String, require: true },
    // address: String,
    // phone: String,
    // email: String,
    // image: String,
    // description: String,
    return res.status(200).json({ EC: 0, data: customer });
  },

  postCreatArrayCustomer: async (req, res) => {
    console.log(">>>>>>CHECK DATA:", req.body.customers);
    let arr = req.body.customers;
    let customers = await createArrayCustomerService(arr);
    if (customers) {
      return res.status(200).json({
        EC: 0,
        data: customers,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        data: customers,
      });
    }
  },
  getCustomer: async (req, res) => {
    console.log(">>>>>>>CHECK QUERY:", req.query);
    let limit = req.query.limit;
    let page = req.query.page;
    let customer = null;
    if (limit && page) {
      console.log("GET WITH FILTER");
      customers = await getAllCustomer(limit, page, req.query.name, req.query);
    } else {
      console.log("GET ALL");
      customers = await getAllCustomer();
    }

    if (customers) {
      return res.status(200).json({
        EC: 0,
        data: customers,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        data: customers,
      });
    }
  },
  putCustomer: async (req, res) => {
    let customers = await updateCustomer(req);
    if (customers) {
      return res.status(200).json({
        EC: 0,
        data: customers,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        data: customers,
      });
    }
  },
  deleteCustomer: async (req, res) => {
    let id = req.body._id;
    let customers = await deleteCustomer(id);
    if (customers) {
      console.log(">>>>>>>>CHECK DELETE:", customers);
      return res.status(200).json({
        EC: 0,
        data: customers,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        data: customers,
      });
    }
  },
  deleteArrayCustomer: async (req, res) => {
    let arr = req.body.customers;
    let results = await deleteManyCustomer(arr);
    if (results) {
      console.log(">>>>>>>>CHECK DELETE:", results);
      return res.status(200).json({
        EC: 0,
        data: results,
      });
    } else {
      return res.status(200).json({
        EC: -1,
        data: results,
      });
    }
  },
};
