/**
 * Handles all routing for private routes.
 *
 * @module routes/private/index
 */
var express = require('express');
var router  = express.Router();

/**
 * GET private/index
 */
router.get('/admin', function (req, res) {
  res.sendFile(path.join(__dirname, '../../Admin/public/views/index.html'));
});

module.exports = router;


// router.get('/', function (req, res) {
//   if (req.isAuthenticated()) {
//     res.json({ status: true, name: req.user.googleName });
//   } else {
//     res.json({ status: false });
//   }
//
// });
