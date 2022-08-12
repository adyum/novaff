var express = require('express');
var router = express.Router();
var db=require('../database');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/player-list', function(req, res) {
  var sql='SELECT * from players ORDER by rank';
  db.query(sql,function (err, data, fields){
    if (err) throw err;
    res.render('player-list', {title: 'Player List', userData: data});
  });
});

router.get('/available', function(req, res) {
  var sql=`SELECT * from players WHERE owner='available' ORDER by rank`;
  db.query(sql,function (err, data, fields){
    if (err) throw err;
    res.render('available', {title: 'Available', userData: data});
  });
});

router.get('/steal', function(req, res) {
  var sql=`SELECT * from players WHERE keeper='no' and owner!='available' ORDER by rank`;
  db.query(sql,function (err, data, fields){
    if (err) throw err;
    res.render('steal', {title: `Steal Draft`, userData: data});
  });
});

router.get('/admin', function(req, res) {
  var sql='SELECT * from players ORDER by rank';
  db.query(sql,function (err, data, fields){
    if (err) throw err;
    res.render('admin', {title: 'Admin Area', userData: data});
  });
});

router.get('/teams/:id', function(req, res) {
  var sql='SELECT * from players WHERE owner=? ORDER by rank';
  db.query(sql,[req.params.id], function (err, data, field){
    if (err) throw err;
    res.render('teams', {title: '? Team', userData: data});
  });
});

router.get('/add-keeper/:id', function(req, res) {
  var sql=`UPDATE players SET keeper='yes' WHERE fantnum=?`;
  db.query(sql,[req.params.id], function (err, data, field){
    if (err) throw err;
    res.render('add-keeper', {title: 'Make keeper', userData: data});
  });
});

router.get('/remove-keeper/:id', function(req, res) {
  var sql=`UPDATE players SET keeper='no' WHERE fantnum=?`;
  db.query(sql,[req.params.id], function (err, data, field){
    if (err) throw err;
    res.render('remove-keeper', {title: 'Remove keeper', userData: data});
  });
});

router.get('/confirm-team/:id', function(req, res) {
  var sql=`SELECT * from players WHERE fantnum=?`;
  db.query(sql,[req.params.id], function (err, data, field){
    if (err) throw err;
    res.render('confirm-team', {title: 'Confirm change players team', userData: data});
  });
});

router.get('/keepers', function(req, res) {
  var sql=`SELECT * from players WHERE keeper='yes' ORDER BY owner`;
  db.query(sql,[req.params.id], function (err, data, field){
    if (err) throw err;
    res.render('keepers', {title: 'List of Keepers', userData: data});
  });
});

router.get('/change-team/:owner/:id', function(req, res) {
  var sql=`UPDATE players SET owner=? WHERE fantnum=?`
  db.query(sql,[req.params.owner,req.params.id], function (err, data, field){
    if (err) throw err;
    res.render('change-team', {title: 'Confirm change players team', userData: data});
  });
});

router.get('/rookies', function(req, res) {
  var sql=`SELECT * from players WHERE rookie='yes'`
  db.query(sql,[req.params.owner,req.params.id], function (err, data, field){
    if (err) throw err;
    res.render('rookies', {title: 'Rookie Players', userData: data});
  });
});

router.get('/add-rookie/:id', function(req, res) {
  var sql=`UPDATE players SET rookie='yes' WHERE fantnum=?`;
  db.query(sql,[req.params.id], function (err, data, field){
    if (err) throw err;
    res.render('add-rookie', {title: 'Make rookie', userData: data});
  });
});

module.exports = router;