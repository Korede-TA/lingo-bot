const firebase = require('firebase');
const dialogflow = require('dialogflow');

class LingoBot extends EventEmitter {

	constructor() {
		// Init Firebase stuff
		this.auth = firebase.auth();
		this.database = firebase.database();
		this.storage = firebase.storage();
		this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));

		// Init Dialogflow stuff
		this.sessionId = 'quickstart-session-id';
		this.projectId = 'PROJECT_ID';
		this.sessClient = new dialogflow.SessionsClient();
		this.sessionPath = this.sessClient.sessionPath(this.projectId, this.sessionId);
	}

	signIn(email, password) {
		let provider = new firebase.auth.GoogleAuthProvider();
		this.auth.signInWithEmailAndPassword(email, password).catch( function(error) {
			let errResp	= { code: error.code, msg: error.message };
		});
	}

	translate(word, targetLang, originLang='en-US') {
		const req = {
			session: this.sessionPath
			queryInptu: {
				text: {
					text: word,
					languageCode: originLang,
				},
			},
		};

		this.sessionClient
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
			});
	}

	save(word, translation, targetLang, originLang='en-US') {
		this.database.ref('words/' + targetLang + word.toLowerCase()).set(translation);
	}

	incrementUserLevel(email, count=1) {
		let originalLvl = 0;
		lvlRef = this.database.ref('users/' + email + '/level');
		lvlRef.transaction( function(lvl) {
			if (lvl) {
				originalLvl = lvl.num;
				lvl.num++;
			}
			return lvl;
		});
		return originalLvl;
	}
}

export default LingoBot;
