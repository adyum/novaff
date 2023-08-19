var express = require('express');
var router = express.Router();
var db=require('../database');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Express' });
});

router.get('/player-list', function(req, res) {
	var sql='SELECT * from players_23 ORDER by players_23.rank';
	db.query(sql,function (err, data){
		if (err) throw err;
		res.render('player-list', {title: 'Player List', userData: data});
	});
});

router.get('/available', function(req, res) {
	var sql='SELECT * from players_23 WHERE owner=\'available\' ORDER by players_23.rank';
	db.query(sql,function (err, data){
		if (err) throw err;
		res.render('available', {title: 'Available', userData: data});
	});
});

router.get('/steal', function(req, res) {
	var sql='SELECT * from players_23 WHERE keeper=\'no\' and owner!=\'available\' and owner!=\'Kyle Stephan\' and owner!=\'Kevin Pulsifer\' and owner!=\'Zack Omalley\' and owner!=\'Kevin McClure\' and owner!=\'Shawn Plesnick\' and owner!=\'Adam Staryak\' and owner!=\'Jack Holtgreive\' and owner!=\'Jim Harris\'  ORDER by players_23.rank';
	db.query(sql,function (err, data){
		if (err) throw err;
		res.render('steal', {title: 'Steal Draft', userData: data});
	});
});

router.get('/admin', function(req, res) {
	var sql='SELECT * from players_23 ORDER by players_23.rank';
	db.query(sql,function (err, data){
		if (err) throw err;
		res.render('admin', {title: 'Admin Area', userData: data});
	});
});

router.get('/teams/:id', function(req, res) {
	var sql='SELECT * from players_23 WHERE owner=? ORDER by players_23.rank';
	db.query(sql,[req.params.id], function (err, data){
		if (err) throw err;
		res.render('teams', {title: '? Team', userData: data});
	});
});

router.get('/add-keeper/:id', function(req, res) {
	var sql='UPDATE players_23 SET keeper=\'yes\' WHERE fantnum=?';
	db.query(sql,[req.params.id], function (err, data){
		if (err) throw err;
		res.render('add-keeper', {title: 'Make keeper', userData: data});
	});
});

router.get('/remove-keeper/:id', function(req, res) {
	var sql='UPDATE players_23 SET keeper=\'no\' WHERE fantnum=?';
	db.query(sql,[req.params.id], function (err, data){
		if (err) throw err;
		res.render('remove-keeper', {title: 'Remove keeper', userData: data});
	});
});

router.get('/confirm-team/:id', function(req, res) {
	var sql='SELECT * from players_23 WHERE fantnum=?';
	db.query(sql,[req.params.id], function (err, data){
		if (err) throw err;
		res.render('confirm-team', {title: 'Confirm change players team', userData: data});
	});
});

router.get('/keepers', function(req, res) {
	var sql='SELECT * from players_23 WHERE keeper=\'yes\' ORDER BY players_23.owner';
	db.query(sql,[req.params.id], function (err, data){
		if (err) throw err;
		res.render('keepers', {title: 'List of Keepers', userData: data});
	});
});

router.get('/change-team/:owner/:id', function(req, res) {
	var sql='UPDATE players_23 SET owner=? WHERE fantnum=?';
	db.query(sql,[req.params.owner,req.params.id], function (err, data){
		if (err) throw err;
		res.render('change-team', {title: 'Confirm change players team', userData: data});
	});
});

router.get('/rookies', function(req, res) {
	var sql='SELECT * from players_23 WHERE rookie=\'yes\'';
	db.query(sql,[req.params.owner,req.params.id], function (err, data){
		if (err) throw err;
		res.render('rookies', {title: 'Rookie Players', userData: data});
	});
});

router.get('/add-rookie/:id', function(req, res) {
	var sql='UPDATE players_23 SET rookie=\'yes\' WHERE fantnum=?';
	db.query(sql,[req.params.id], function (err, data){
		if (err) throw err;
		res.render('add-rookie', {title: 'Make rookie', userData: data});
	});
});

router.get('/power-rankings/:id', function(req, res) {
	var sql='SELECT * from power_rankings where id=?';
	db.query(sql,[req.params.id], function (err, data){
		if (err) throw err;
		res.render('power-rankings', {title: 'Power Rankings', userData: data});
	});
});

router.get('/api-test', function(req, res) {
	res.render('api-test', { title: 'Express' });
});

router.get('/matchup/:season/:week', function(req, res) {
	var sql='SELECT * from matchups where season=? and week=? order by mactchups.matchup_id';
	db.query(sql,[req.params.season,req.params.week], function (err, data){
		if (err) throw err;
		res.render('matchup', {title: 'Week ' + req.params.week, userData: data});
	});
});

module.exports = router;