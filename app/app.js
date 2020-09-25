let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dataBaseConfig = require('./db/db');

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
  useNewUrlParser: true,
  useFindAndModify: false
}).then(() => {
    console.log('\x1b[32m%s\x1b[0m', '[LUXX][app] Database connected sucessfully!');
  },
  error => {
    console.log('\x1b[31m%s\x1b[0m', '[LUXX][app] Could not connected to database: ' + error + '!');
  }
);

// Set up express js port
const userRoute = require('./routes/user.route');
const contactRoute = require('./routes/contact.route');
const companyRoute = require('./routes/company.route');
const pipelineRoute = require('./routes/pipeline.route');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());

// Setting up static directory
app.use(express.static(path.join(__dirname, 'dist/luxx')));


// RESTful API root
app.use('/user', userRoute);
app.use('/contact', contactRoute);
app.use('/company', companyRoute);
app.use('/pipeline', pipelineRoute);

// PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('\x1b[32m%s\x1b[0m', '[LUXX][app] Connected to port ' + port + '!');
});

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  //next(404);
  //next(createError(404));
  console.error('\x1b[31m%s\x1b[0m', '[LUXX][app] Error 404!');
});

// Index Route
app.get('/', (req, res) => {
  res.send('invalid endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/luxx/index.html'));
});

// error handler
app.use(function(err, req, res, next) {
  console.error('\x1b[31m%s\x1b[0m', '[LUXX][app] ' + err.message + '!');
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
