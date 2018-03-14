'use strict';
process.env.DEBUG = 'actions-on-google:*';

// --------- LIBRARY TO BE INCLUDED ---------
const Assistant = require('actions-on-google').ApiAiAssistant;
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

//-------- REF IN THE DATABASE -------
const dictionaryRef = admin.database().ref('/dictionary/spanish');


//------- DIALOGFLOW INTENT NAMES -----
const dictionary_intent = "dictionary";
const translate_intent = "translate";


//------- DIALOGFLOW CONTEXT NAME -----
const await_word_context = "awaiting_word";


exports.lingo = functions.http.onRequest((request, response) => {
    console.log('headers: ' + JSON.stringify(request.headers));
    console.log('body: ' + JSON.stringify(request.body));

    //------------ MAP THE FUNCTION OF THE BOT TO INTENT ----------
     const assistant = new Assistant({request: request, response: response});
     let actionMap = new Map();
     actionMap.set(translate_intent, translate_func);


     //------- FUNCTION TO GET WORD FROM DICTIONARY -------
     function translate_func(){
         console.log("translate");
         dictionaryRef.once('value', snap => {
             const speech = `The answer is ${snap.val().cryptocurrency}`;
             assistant.ask(speech);
         });

     }
});
