// global vairables and imported software
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var path = require('path');


// base url returns index.html from public foulder
router.get('/', function(req, res) {
    console.log('Base URL reached. Returning index.html');
    res.sendFile(path.resolve('public/views/index.html'));
});
