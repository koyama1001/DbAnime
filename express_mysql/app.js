const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs') 
const app = express()
const port = 3000
const mysql = require('mysql');


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'LikeAnime' 
});



con.connect(function(err) {
	if (err) throw err;
	console.log('Connected');
});



app.get('/', (req, res) => {
	const sql = "select * from anime";
	con.query(sql, function (err, result, fields) {  
	if (err) throw err;
	res.render('index',{users : result});
	});
});

app.post('/', (req, res) => {
	const sql = "INSERT INTO anime SET ?"
	con.query(sql,req.body,function(err, result, fields){
		if (err) throw err;
		console.log(result);
		res.redirect('/');
	});
});

app.get('/create', (req, res) => 
	res.sendFile(path.join(__dirname, 'html/form.html')))

app.get('/edit/:id',(req,res)=>{
	const sql = "SELECT * FROM anime WHERE id = ?";
	con.query(sql,[req.params.id],function (err, result, fields) {  
		if (err) throw err;
		res.render('edit',{user : result});
		});
});

app.get('/name',(req,res)=>{
	const sql = "SELECT * FROM anime  ORDER BY name ASC;";
	con.query(sql,req.body,function(err, result, fields){
		if (err) throw err;
		res.render('index',{users : result});
		});
	});

app.get('/ID',(req,res)=>{
		const sql = "SELECT * FROM anime  ORDER BY ID ASC;";
		con.query(sql,req.body,function(err, result, fields){
			if (err) throw err;
			res.render('index',{users : result});
			});
		});
app.get('/RANK',(req,res)=>{
			const sql = "SELECT * FROM anime  ORDER BY rank DESC;";
			con.query(sql,req.body,function(err, result, fields){
				if (err) throw err;
				res.render('index',{users : result});
				});
			});


app.post('/update/:id',(req,res)=>{
	const sql = "UPDATE anime SET ? WHERE id = " + req.params.id;
	con.query(sql,req.body,function (err, result, fields) {  
		if (err) throw err;
		console.log(result);
		res.redirect('/');
		});
});

app.get('/delete/:id',(req,res)=>{
	const sql = "DELETE FROM anime WHERE id = ?";
	con.query(sql,[req.params.id],function(err,result,fields){
		if (err) throw err;
		console.log(result)
		res.redirect('/');
	})
});


app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))