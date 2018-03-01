const mysql = require("mysql");
const EventEmitter = require("events");

class Database extends EventEmitter {
	
	constructor() {
		this.conn = mysql.createConnection({
			host: "localhost",
			user: process.env.DB_USERNAME,
			password: process.env.DB_PASSWORD,
		});
	}

	_handleAsEvent(name, data, err=null) {
		if (err) {
			this.emit('error', err);
		} else {
			this.emit(name, data);
		}
	}

	// returns userId
	createUser(user, password, callback) {
		this.conn.connect();
		this.conn.query(
			`INSERT INTO Users (username, password, current_level) VALUES (??, ??, 1); SELECT LAST_INSERT_ID();`,
			[user, password],
			function(err, results, fields) {
				this._handleAsEvent('userCreated', results[0], err);
			},
		);
		this.conn.end();

	}

	// returns new user leve
	progressUserLevel(userId, callback) {
		// UPDATE Users SET Level = Level + 1 WHERE user_id=userId
		this.conn.connect();
		this.conn.query(
			`UPDATE Users SET Level = Level + 1 WHERE user_id=??`,
			[userId],
			function(err, results, fields) {
				this._handleAsEvent('userWordRetrieved', results[1], err);
			},
		);
		this.conn.end();
	}

	// returns list of words
	getUserWords(userId) {
		// SELECT @wordId := word_id FROM User_Words WHERE user_id=userId   # Call them wordIds
		// SELECT value FROM Words WHERE id=WordIds
		let newUserId;
		this.conn.connect();
		this.conn.query(
			`SELECT @wordIds := word_id FROM User_Words WHERE user_id=??;
			 SELECT value FROM Words WHERE id=@wordIds;`
			[userId],
			function(err, results, fields) {
				this._handleAsEvent('userWordRetrieved', results[1], err);
			},
		);
		this.conn.end()	
	}

	// returns null
	saveUserWord(userId, word) {
		// INSERT (value) INTO Words;
		// SELECT LAST_INSERT_ID();   # Call it wordId
		// INSERT (userId, wordId) INTO User_Words;
		word = word.toLower();
		this.conn.connect();
		this.conn.query(
			`INSERT (??) INTO Words;
		    SELECT @wordId := LAST_INSERT_ID();
		 	 INSERT (??, @wordId) INTO User_Words;`,
			[word, userId],
			function(err, results, fields) {
				this._handleAsEvent('userWordSaved', {}, err);
			},
		);
		this.conn.end()	
	}

}

export default Database;
