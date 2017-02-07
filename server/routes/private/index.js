/**
 * Handles all routing for private routes.
 *
 * @module routes/private/index
 */
var express = require('express');
var router  = express.Router();
var admin = require('./admin');

/** ---------- SUBROUTES ---------- **/
router.use('/admin', admin);

/**
 * GET private/index
 */
router.get('/', function (req, res) {
  res.redirect('/'); // they made it!
});

module.exports = router;
