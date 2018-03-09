const express = require("express");
const app = express();
const mysql = require("mysql");
app.use(express.static("."));

//--------- MYSQL --------
this.conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'arenevsal1998',
    database: 'dbname'
});

//------ CHECK TO MAKE SURE CONNECTION ARE GOOD --------
this.conn.connect(function(err) {
    if (err) {
        console.log('Error connecting to database');
    }
    else {
        console.log('Database successfully connected');
    }
});



// ----------- SERVING APP ----------
app.get("/", function(req, res) {
	res.sendFile("index.html", { root: "./" });
});


// ---------- MAKE A CALL TO MYSQL SERVER AND GET DATA OVER HERE ----------
app.get("/data", function(req, res){



	res.json([{"id": 1, "name": "Mymm", "city": "Pantano do Sul"},
		{"id": 2, "name": "Skyble", "city": "Guilmaro"},
		{"id": 3, "name": "Tagfeed", "city": "Gnosjö"},
		{"id": 4, "name": "Realcube", "city": "Jrashen"},
		{"id": 5, "name": "Bluejam", "city": "Zhangjiawo"},
		{"id": 6, "name": "Jayo", "city": "Obonoma"},
		{"id": 7, "name": "Cogidoo", "city": "Sungsang"},
		{"id": 8, "name": "Avavee", "city": "Diawara"},
		{"id": 9, "name": "Tagtune", "city": "Monywa"},
		{"id": 10, "name": "Centimia", "city": "Retkovci"}]);
});

app.listen(8080, function(){
    console.log("Server running...");
});
