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


app.get("/", function(req, res) {
	res.sendFile("index.html", { root: "./" });
});

app.listen(8080, function(){
    console.log("Server running...");
});
