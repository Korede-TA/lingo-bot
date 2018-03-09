# lingo-bot
(CS275 term project)

Korede Aderele (korede-ta), Minh Le (cassandrale179), Saloni Purswani (sppurswani)

__A chatbot that helps you practice speaking a foreign language and learn new words__


## SET UP SERVER AND MYSQL DATABASE
In current folder:
```
npm install express
npm install mysql
npm install dialogflow
```

mysqladmin -u root password 'yourpassword'
Go into the directory of where mysql is installed:
```
cd usr/local/bin
sudo mysql -uroot -pyourpassword
```


## CHANGE LOG
On Database.js, export module in ES6 syntax style:
```
exports.Database = Database;
```


## USEFUL RESOURCES 
https://stackoverflow.com/questions/45933303/how-to-get-results-from-mysql-db-using-node-js-mysql-and-send-them-back-to-api-a  
