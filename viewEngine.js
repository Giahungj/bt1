import express from 'express';
const app = express();

const viewEngine = (app) => {
    app.set("view engine", "ejs");
    app.set("views", "./views");
}

export default viewEngine;