const aws = require('aws-sdk');

aws.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:8000",

});

let dynamoDB = new aws.DynamoDB();
let params = {
  TableName: "Books",
  KeySchema: [
    {AttributeName: "name", KeyType: "HASH"},
    {AttributeName: "year", KeyType: "RANGE"}
  ],
  AttributeDefinitions:[
    {AttributeName: "name", AttributeType: "S"},
    {AttributeName: "year", AttributeType: "N"}
  ],
  ProvisionedThroughput:{
    ReadCapacityUnits: 10,     
    WriteCapacityUnits: 10 
  }
}

dynamoDB.createTable(params, (err, data) =>{
  if(err){
    console.error(`CREATE TABLE: Something went wrong ${JSON.stringify(err,null,2)}`); 
  }else{
    console.log(`Created table ${JSON.stringify(data, null, 2)}`); 
  }
})
