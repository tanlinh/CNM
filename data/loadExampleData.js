const aws = require('aws-sdk');
const fs = require('fs');

aws.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:8000",

});
const docClient = new aws.DynamoDB.DocumentClient();
const DATA_FILE = "./bookdata.json"
let books = JSON.parse(fs.readFileSync(DATA_FILE,'utf8'));

books.forEach((book) =>{
  let params = {
    TableName: "Books",
    Item: {
      "name" : book.name,
      "year" : book.year,
      "type" : book.type,
      "author": book.author
    }
  }
  docClient.put(params, (err, data) =>{
    if(err){
      console.error(`Unable to add book ${book.name}, ${JSON.stringify(err, null, 2)}`); 
    }else{
      console.log(`Book created ${book.name}`); 
    }
  })
})