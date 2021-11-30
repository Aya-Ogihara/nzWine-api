const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

//const items = require('./routes/api/items');

const app = express();

// Body parser Middleware
app.use(bodyParser.json());

// DB Config
//const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
  .connect(
    'mongodb+srv://myFlixDB-admin:Admin123@aya-cluster.stqui.mongodb.net/nzWineDB?retryWrites=true&w=majority'
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch((err) => console.log(err));

// Use Routes
//app.use('/api/items', items)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Cors
app.use(cors({
  origin: '*'
}));

// app.use(cors({
//   origin: 'https://nzwine.herokuapp.com'
// }))

// app.use(cors({
//   origin: 'http://localhost:3000'
// }));

// Models
const Models = require('./models');
const Wines = Models.Wine;
const Regions = Models.Region;

/* ======
  GET
====== */
// Welcome page
app.get('/', (req, res) => {
  res.send('Welcome to nzWine app!');
});

// @route GET /regions
// @desc Return a list of all nz wine regions
// @access Public
app.get('/regions', (req, res) => {
  Regions.find()
    .populate('Wine')
    .then((regions) => {
      res.status(201).json(regions);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Error: ${err}`);
    });
});

// @route GET /regions/[name]
// @desc Return data about an nz wine region by name
// @access Public
app.get('/regions/:Name', (req, res) => {
  Regions.findOne({ Name: req.params.Name })
    .then((region) => {
      res.status(201).json(region);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Error: ${err}`);
    });
});

// @route GET /varieties
// @desc Return a list of all nz wine varieties
// @access Public
app.get('/wines', (req, res) => {
  Wines.find()
    .then((wines) => {
      res.status(201).json(wines);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Error: ${err}`);
    });
});

// @route GET /varieties/[name]
// @desc Return data about an nz wine variety by name
// @access Public
app.get('/wines/:Name', (req, res) => {
  Wines.findOne({ Name: req.params.Name })
    .then((wine) => {
      res.status(201).json(wine);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(`Error: ${err}`);
    });
});

/* ======
  POST
====== */
// @route POST /regions
// @desc Post data about an nz wine region
// @access Hidden
app.post('/regions', (req, res) => {
  const newRegion = new Regions({
    Name: req.body.Name,
    Description: req.body.Description,
  });
  newRegion.save().then((region) => res.json(region));
});

// @route POST /regions
// @desc Post data about an nz wine region
// @access Hidden
app.post('/wines', (req, res) => {
  const newWine = new Wines({
    Name: req.body.Name,
    Description: req.body.Description,
  });
  newWine.save().then((region) => res.json(region));
});

/* ======
  DELETE
====== */
// @route DELETE /regions/:id
// @desc Delete an nz wine region
// @access Hidden
app.delete('/regions/:id', (req, res) => {
  Regions.findById(req.params.id)
    .then((region) => region.remove().then(() => res.send('Deleted')))
    .catch((err) => res.status(404).res.send('Something is wrong'));
});

// Server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
