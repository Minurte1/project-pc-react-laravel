// import express from "express";

// const configViewEngine = (app) => {
//     app.use(express.static('./src/public'))
//     app.set("view engine", "ejs")
//     app.set("views", "./src/views")
// }

// export default configViewEngine;

const path = require("path");
const express = require("express");

const configViewEngine = (app) => {
    app.set("views", path.join("./src", "views"));
    app.set("view engine", "ejs");

    app.use(express.static(path.join("./src", "public")));
};

module.exports = configViewEngine;