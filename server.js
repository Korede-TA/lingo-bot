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


    //------ I AM HARDCODING THE DATA HERE ---- //
	res.json([
        {w: "programming", t: "programación" },
        {w: "artificial intelligence", t: "inteligencia artificial"},
        {w: "cryptocurrency", t: "criptomoneda"},
        {w: "hello", t: "Hola" },
        {w: "cake", t: "pastel"},
        {w: "school", t: "colegio"}
    ]);
});

app.listen(8080, function(){
    console.log("Server running...");
});


/* ----- DIALOGFLOW STUFF DOWN HERE -----
const projectId = 'ENTER_PROJECT_ID_HERE'; //https://dialogflow.com/docs/agents#settings
const sessionId = 'quickstart-session-id';
const query = 'hello';
const languageCode = 'en-US';

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// The text query request.
const request = {
  session: sessionPath,
  queryInput: {
    text: {
      text: query,
      languageCode: languageCode,
    },
  },
};

// Send request and log result
sessionClient
  .detectIntent(request)
  .then(responses => {
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }
  })
  .catch(err => {
    console.error('ERROR:', err);
}); */
