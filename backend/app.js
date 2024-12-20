const express = require('express');
const { errors } = require('celebrate');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const { validateSignUp, validateLogin } = require('./utils/validation');
const userController = require('./controllers/users');
const authorization = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

dotenv.config();

mongoose.connect(process.env.MONGO_DB).then(() => {
  console.log('Conexión exitosa a la base de datos');
}).catch((err) => {
  console.log('Error al conectarse a la base de datos', err);
});

const app = express();
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');
const { PORT = 3001 } = process.env;

app.use(express.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor ahora fallará');
  }, 0);
});
app.use(cors());
app.options('*', cors());
app.use(requestLogger);
app.post('/signup', validateSignUp, userController.createUser);
app.post('/signin', validateLogin, userController.login);
app.use(authorization);
app.use(usersRoute);
app.use(cardsRoute);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'Se produjo un error en el servidor' : message,
  });
  next(new Error('Error de autorización'));
});
app.listen(PORT, () => {console.log(`App listening on port ${PORT}`);});
