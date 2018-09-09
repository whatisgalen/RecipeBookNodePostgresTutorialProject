const pg        = require('pg');
const express   = require('express');
const app       = express();

const config = {
    user: 'postgres',
    database: 'recipebookdb',
    password: 'i|xa1(/3Nnwt',
    port: 5432
};

const pool = new pg.Pool(config);



// var express = require('express'),
// 	path = require('path'),
// 	bodyParser = require('body-parser'),
// 	cons = require('consolidate'),
// 	dust = require('dustjs-helpers'),
// 	pg = require('pg'),
// 	pool = new pg.pool,
// 	app = express();

// var pool = new pg.Pool()

//DB connect string -- note that it was username:password@localhost/databse
var connect = "postgres://postgres:i|xa1(/3Nnwt@localhost/recipebookdb";

//assign dust engine to .dust files
app.engine('dust', cons.dust);

//set .dust as the default extension
app.set('view engine', 'dust');
app.set('views', __dirname + '/views');

//set public folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.get('/', function(req, res){
	//pg connect
	pool.connect(connect, function(err, client, done) {
	if (err) {
		return console.error('error fetching client from pool', err);
	}
	client.query('SELECT * FROM recipes', function(err, result) {
		//call 'done()' to release the  client back to the pool
		if(err) {
			return console.error('error running query', err);
		}
		// console.log(result.rows[0].number);
		//output: 1
		res.render('index',{recipes: result.rows})
		done();
	});
});
});

//server
app.listen(3000, function() {
	console.log('Server started on port 3000');
});











// pg.connect(conString, function(err, client, done) {
// 	if (err) {
// 		return console.error('error fetching client from pool', err);
// 	}
// 	client.query('SELECT $1::int AS number', ['1'], function(err, result) {
// 		//call 'done()' to release the  client back to the pool
// 		done();

// 		if(err) {
// 			return console.error('error running query', err);
// 		}
// 		console.log(result.rows[0].number);
// 		//output: 1
// 	});
// });