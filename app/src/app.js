// import statement
import express from 'express';
import path from 'path';

import {
  create
} from 'express-handlebars';
import {
  SOURCE_PATH
} from './constants.js';

import {
  addEvent,
  addOrkestUser,
  home,
  inventory,
  planner
} from './controllers/dashboard.js';
import bodyParser from 'body-parser';
import DataSource from './lib/DataSource.js';
import cookieParser from 'cookie-parser';

//import middleware
import registerAuthentication from './middleware/validation/registerAuthentication.js';
import loginAuthentication from './middleware/validation/loginAuthentication.js';
import {
  jwtAuth
} from './middleware/jwtAuth.js';

import swaggerUi from 'swagger-ui-express';
import swaggerDefinition from "./docs/swagger.js";

import {
  deleteUser,
  getSpecificUser,
  getUsers,
  postUser,
  updateUser,
} from './controllers/api/user.js';
import {
  deleteItem as deleteItemAPI,
  getItems,
  getSpecificItem,
  postItem as postItemAPI,
  updateItem as updateItemAPI,
} from './controllers/api/inventory.js';
import {
  login,
  logout,
  postLogin,
  postRegister,
} from './controllers/authentication.js';
import {
  deleteItem,
  postItem,
  updateItem
} from './controllers/inventory.js';
import {
  postEvent as postEventAPI
} from './controllers/api/events.js';
import {
  postEvent
} from './controllers/events.js';

//create express  app
const app = express();

// user the cookie parser
app.use(cookieParser());

//serve static files
app.use(express.static('client/assets'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use('/scripts', express.static(path.join(SOURCE_PATH, '/scripts')));

// ----------------HANDLEBARS---------------//
const hbs = create({
  extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(SOURCE_PATH, 'views'));

//-----------------ROUTES --------------//
app.get('/', jwtAuth, home);
app.get('/addOrkestUser', jwtAuth, addOrkestUser);
app.post('/addOrkestUser', registerAuthentication, postRegister, addOrkestUser);
app.get('/addEvent', jwtAuth, addEvent)
app.post('/addEvent', jwtAuth, postEvent, addEvent)
app.get('/login', login);
app.post('/login', loginAuthentication, postLogin, login);
app.post('/logout', logout);
app.get('/inventory', jwtAuth, inventory);
app.get('/planner', jwtAuth, planner);
app.post('/postItem', jwtAuth, postItem, inventory)
app.post('/changeItem/:id', jwtAuth, updateItem, inventory)
app.post('/deleteItem/:id', jwtAuth, deleteItem, inventory)

//API routes
//user
app.get('/api/users', getUsers);
app.get('/api/users/:id', getSpecificUser);
app.post('/api/users', postUser);
app.put('/api/users', updateUser);
app.delete('/api/users/:id', deleteUser);

//inventory
app.get('/api/inventory', getItems);
app.get('/api/inventory/:id', getSpecificItem);
app.post('/api/inventory', postItemAPI);
app.put('/api/inventory', updateItemAPI);
app.delete('/api/inventory/:id', deleteItemAPI);

//event
app.post('/api/events', postEventAPI);

app.get('/', home);
const port = process.env.PORT || 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

//start the app
if (process.env.NODE_ENV !== 'test') {
  if (process.env.NODE_ENV !== 'test') {
    DataSource.initialize()
      .then(() => {
        // start the server
        app.listen(port, () => {
          console.log(`server started at port http://localhost:${port}`);
        });
      })
      .catch(function (error) {
        console.log('Error: ', error);
        console.log('Error: ', error);
      });
  }
}

export default app;