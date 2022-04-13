const express = require('express');
const bodyParser = require('body-parser');

const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');

const middlewareError = require('./middleware/middlewareError');
const validationUser = require('./middleware/validationUser');
const validationLogin = require('./middleware/validateLogin');
const authenticateMidd = require('./middleware/authenticateMidd');

const app = express();
app.use(bodyParser.json());

app.get('/user', authenticateMidd, UserController.getUsers);

app.post('/user', validationUser, UserController.createUser);

app.post('/login', validationLogin, LoginController.login);

app.use(middlewareError);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
