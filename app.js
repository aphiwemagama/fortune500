const express = require('express');
const mysql = require('mysql2');

const app = express();

const connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'fortune500'
});

connection.connect((err) => {
	if(err){
		console.error('Error connecting to mysql database: '+err.satck);
		return;
	}
	console.log('Connected on MySQL database as id'+connection.threadId);
	
	app.get('/api/c/all', (req, res) => {
		connection.query('SELECT * FROM company', (error, results, fields) => {
			if(error){
				console.error('Error executing query: '+error.stack);
				res.status(500).json({error: 'Internal Server Error'});
				return;
			}
			res.json(results);
		});
	});
	app.get('/api/c/:id', (req, res) => {
		const id = req.params.id;
		
		connection.query('SELECT * FROM company WHERE id = '+id, (error, results, fields) => {
			if(error){
				console.error('Error executing query: '+error.stack);
				res.status(500).json({error: 'Internal Server Error'});
				return;
			}
			res.json(results);
		});
	});
	
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log('Server is running on port '+PORT);
	})
});