const express = require('express');
const bodyParser = require('body-parser');

const routerLogin = require('./routes/Login');
const routerUser = require('./routes/User');
const routerCategory = require('./routes/Category');
const routerPost = require('./routes/Post');

const middlewareError = require('./middleware/middlewareError');

const app = express();
app.use(bodyParser.json());

app.use('/login', routerLogin);

app.use('/user', routerUser);

app.use('/categories', routerCategory);

app.use('/post', routerPost);

app.use(middlewareError);

app.listen(3000, () => console.log('ouvindo porta 3000!'));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});
