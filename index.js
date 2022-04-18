const express = require('express');
const bodyParser = require('body-parser');

const UserController = require('./controllers/UserController');
const LoginController = require('./controllers/LoginController');
const CategoryController = require('./controllers/CategoryController');
const PostController = require('./controllers/PostController');

const middlewareError = require('./middleware/middlewareError');
const validationUser = require('./middleware/validationUser');
const validationLogin = require('./middleware/validateLogin');
const authenticateMidd = require('./middleware/authenticateMidd');
const validationPost = require('./middleware/validationPost');
const validateEditPost = require('./middleware/validateEditPost');

const app = express();
app.use(bodyParser.json());

app.post('/login', validationLogin, LoginController.login);

app.get('/user', authenticateMidd, UserController.getUsers);

app.get('/user/:id', authenticateMidd, UserController.getUserById);

app.post('/user', validationUser, UserController.createUser);

app.get('/categories', authenticateMidd, CategoryController.getCategories);

app.post('/categories', authenticateMidd, CategoryController.createCategory);

app.post('/post', authenticateMidd, validationPost, PostController.createPost);

app.get('/post', authenticateMidd, PostController.getPosts);

app.get('/post/:id', authenticateMidd, PostController.getPostById);

app.put('/post/:id', authenticateMidd, validateEditPost, PostController.editPost);

app.use(middlewareError);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
