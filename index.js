const express = require('express');
const bodyParser = require('body-parser');

const UserController = require('./controllers/UserController');
const middlewareError = require('./middleware/middlewareError');
const validationUser = require('./middleware/validationUser');

const app = express();
app.use(bodyParser.json());

app.post('/user', validationUser, UserController.createUser);

app.use(middlewareError);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
