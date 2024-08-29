const path = require("path");
const express = require("express");
const configViewEngine = (app) => {
  app.set("views", path.join("./src", "views")); //config template engine, __dirname se lay ten cua vi tri folder file js dang ở, path.join se ket hop ten folder lúc này la src va ten view là views lại thành 1 path
  app.set("view engine", "ejs");
  app.use(express.static(path.join("./src", "public")));
};

module.exports = configViewEngine;
