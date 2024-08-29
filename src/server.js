require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8888;
//Neu port ben file ENV bi loi, port se lay cong port 8888 de chay
const path = require("path");
const configViewEngine = require("./config/viewEngine");
const hostname = process.env.HOST_NAME;
const webRoute = require("./routes/web");
const apiRoute = require("./routes/api");
const conn = require("./config/database");
const fileUpload = require("express-fileupload");
const { MongoClient } = require("mongodb");
// default options
app.use(fileUpload());
configViewEngine(app);

//Config data from view/ req.body
app.use(express.json()); // Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies

//Tiền tố "/test" trong link nói rằng tất cả các đường link sẽ phải chứa tiền tố này, kỹ thuật này dùng để phân quyền
app.use("/test", webRoute);
app.use("/", webRoute);
app.use("/v1/api", apiRoute);

(async () => {
  try {
    //Connect for mongonoose
    await conn();
    const url = process.env.DB_HOST_WITH_DRIVER;
    const client = new MongoClient(url);

    // Database Name
    const dbName = process.env.DB_database;
    // Use connect method to connect to the server
    await client.connect();
    console.log("Connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection("customers");
    const names = "name";
    const result = await collection.insertOne({
      names: "DUCKaejrgakjejvaejvakjfvajkvdakdv",
      address: {
        name: "VietNam",
        code: 83,
      },
    });
    console.log(">>>>>>>>>>>>>>Insert result:", result);

    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(">>>>>>>>ERRO CONNECT TO DB:", error);
  }
})();
