const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
const expressHbs = require('express-handlebars');
const authController = require('./controllers/auth');
const path = require('path');
const bodyParser = require('body-parser');

//Routes

const adminRoutes = require('./routes/admin.routes');
const authRoutes = require('./routes/auth.routes');
//For .env
dotenv.config({
  path: '.env',
});

//express initialisation
const app = express();

/* socket IO
var http = require('http').createServer(app);
var io = require('socket.io')(http);

io.on('connection', async (socket) => {
  let orderData = [];

  console.log('a user connected');

  setInterval(async () => {
    await kitchenController.getOrder().then((data) => {
      orderData = data;
    });
    socket.emit('data', orderData);
  }, 1000);
});
*/
//PORT
const PORT = process.env.PORT || 5000;

/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log(
    '%s MongoDB connection error. Please make sure MongoDB is running.',
    chalk.red('✗')
  );
  process.exit();
});

//PASSPORT

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
      maxAge: 1209600000, //two weeks
    },
  })
);
app.use(passport.initialize());

app.use(passport.session());

/**
 * Express configuration.
 */

app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8081);
app.set('views', path.join(__dirname, 'views'));
app.engine(
  '.hbs',
  expressHbs({
    layoutsDir: './views/layouts',
    defaultLayout: 'layout',
    extname: '.hbs',
  })
);
app.set('view engine', '.hbs');
app.use(express.static('public')); //add public folder

// Middlewares
app.use(flash());

//Generate admin user
authController.generateAdminAccount();

//Routes

//Auth Routes
app.use('/', authRoutes);

//Admin Routes
app.use('/admin', adminRoutes);


//PORT Running
app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}/login`);
});


