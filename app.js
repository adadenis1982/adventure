const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
require('dotenv').config();

const { home, cookiesCleaner } = require('./middleware/index');

const homeRouter = require('./routes/home');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const profileRouter = require('./routes/profile');

const app = express();
const PORT = process.env.PORT ?? 4000;

const sessionConfig = {
  store: new FileStore(),
  key: 'user_sid',
  secret: `${process.env.SECRET_WORD}`,
  resave: true,
  saveUninitialized: false,
  cookie: {
    expires: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

app.set('view engine', 'hbs');

app.use(session(sessionConfig));
app.use(cookieParser());
app.use(cookiesCleaner);
app.use(logger('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(home);

app.use('/home', homeRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);

app.listen(PORT, () => console.log(`*Server started at http://localhost:${PORT}`));
