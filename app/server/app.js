// import statement
import Express from "express";
import path from "path";


import {
  create
} from "express-handlebars";
import {
  SOURCE_PATH
} from "./constants.js";
import handlebarsHelpers from "./lib/handlebarsHelpers.js";

import {
  home
} from "./controllers/home.js";
import bodyParser from "body-parser";
import DataSource from "./lib/DataSource.js";
import cookieParser from "cookie-parser";

//create express  app
const app = express();

// user the cookie parser
app.use(cookieParser());

//serve static files
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// ----------------HANDLEBARS---------------//
const hbs = create({
  helpers: handlebarsHelpers,
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