// routes/busRoutes.js

const routerBus = require('express').Router();
const {
  addBus,
  getBuses,
  getBusById,
  updateBus,
  deleteBus
} = require('../controllers/busController');
const auth = require('../middleware/auth');

// make list public:
routerBus.get('/public', getBuses); // public bus list

// still protect add/update/delete:
routerBus.post('/',     auth,   addBus);
routerBus.get('/:id',   auth,   getBusById);
routerBus.put('/:id',   auth,   updateBus);
routerBus.delete('/:id',auth,   deleteBus);

module.exports = routerBus;
