// import statement
import express from "express";
import path from "path";


import {
  create
} from "express-handlebars";
import {
  SOURCE_PATH
} from "./constants.js";
// import handlebarsHelpers from "./lib/handlebarsHelpers.js";

import {
  home
} from "./controllers/home.js";
import bodyParser from "body-parser";
import DataSource from "./lib/DataSource.js";
import cookieParser from "cookie-parser";
import {
  deleteUser,
  getSpecificUser,
  getUsers,
  postUser,
  updateUser
} from "./controllers/api/user.js";
import {
  deleteItem,
  getItems,
  getSpecificItem,
  postItem,
  updateItem
} from "./controllers/api/inventory.js";

//create express  app
const app = express();

// user the cookie parser
app.use(cookieParser());

//serve static files
app.use(express.static("client/assets"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// ----------------HANDLEBARS---------------//
const hbs = create({
  // helpers: handlebarsHelpers,
  extname: "hbs",
  // defaultLayout: "main",
  // layoutsDir: path.resolve("src", "views", "layouts"),
  // partialsDir: path.resolve("src", "views", "partials"),
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", path.join(SOURCE_PATH, "views"));

//-----------------ROUTES --------------//
//API routes
//user
app.get("/api/users", getUsers);
app.get("/api/users/:id", getSpecificUser);
app.post("/api/users", postUser);
app.put("/api/users", updateUser);
app.delete("/api/users/:id", deleteUser);


//inventory
app.get("/api/inventory", getItems);
app.get("/api/inventory/:id", getSpecificItem);
app.post("/api/inventory", postItem);
app.put("/api/inventory", updateItem);
app.delete("/api/inventory/:id", deleteItem);


app.get("/", home);
const port = process.env.PORT || 3000;

//start the app
if (process.env.NODE_ENV !== "test") {
  DataSource.initialize()
    .then(() => {
      // start the server
      app.listen(port, () => {
        console.log(`server started at port http://localhost:${port}`);
      });
    })
    .catch(function (error) {
      console.log("Error: ", error);
    });
}

export default app;