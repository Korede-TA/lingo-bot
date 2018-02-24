 // This code snippet connect the Dialogflow to MySQL Databse. Not sure if it works, but if it doesn't, I'm just gonna use Firebase 
 // Source: https://stackoverflow.com/questions/45933303/how-to-get-results-from-mysql-db-using-node-js-mysql-and-send-them-back-to-api-a 
 
 'use strict';
    const mysql = require('mysql');

    exports.her_goes_your_function_name = (req, res) => { //add your function name
        //Determine the required action
        let action = req.body.result['action'];

    if (action === 'get.data') {

        // Call the callDBJokes method
        callDB().then((output) => {
            // Return the results of the weather API to API.AI
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(output));
        }).catch((error) => {
            // If there is an error let the user know
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(error));
        });

    }
    };

    function callDB() {
        return new Promise((resolve, reject) => {

        try {

            var connection = mysql.createConnection({
                host: "127.0.0.1",
                user: "your_user",
                password: "your_pass",
                database: "your_DB"
            });

            connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
                if (!error) {

                    let response = "The solution is: " + results[0].solution;
                    response = response.toString();
                    let output = {'speech': response, 'displayText': response};
                    console.log(output);
                    resolve(output);

                } else {

                    let output = {'speech': 'Error. Query Failed.', 'displayText': 'Error. Query Failed.'};
                    console.log(output);
                    reject(output);

                }
            });
            connection.end();

        } catch (err) {
            let output = {'speech': 'try-cacth block error', 'displayText': 'try-cacth block error'};
            console.log(output);
            reject(output);

        }

    }
