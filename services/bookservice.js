const aws = require('aws-sdk');

aws.config.update({
  region: "us-east-1",
  endpoint: "http://localhost:8000"
})

const docClient = new aws.DynamoDB.DocumentClient();

module.exports = class {

  static async getAllBook() {
    let params = {
      TableName: "Books"
    }
    let result = {};

    await docClient.scan(params).promise()
    .then((data) => {
      result.data = data;
    }).catch((err) => {
      console.error('BOOK SERVICE: GET ALL HAS BEEN ERROR...', JSON.stringify(err, null, 2));
      result.err = err;
    })
    return result;
  }

  static async searchBook(year, name) {
    let params = {
      TableName: "Books",
      KeyConditionExpression: '#y = :year and #n = :name',
      ExpressionAttributeNames : {
        '#y': 'year',
        '#n': 'name'
      },
      ExpressionAttributeValues : {
        ':year': Number(year),
        ':name': String(name)
      }
    };

    let result = {};

    await docClient.query(params).promise()
    .then((data) =>{
      result.data = data;
    }).catch((err) => {
      console.error('BOOK SERVICE: SEARCH HAS BEEN ERROR...', JSON.stringify(err, null, 2));
      result.err = err;
    })
      return result;
  }

  static async create(name, year, type, author){
    let params = {
      TableName: "Books",
      Item: {
        name : String(name),
        year: Number(year),
        type: String(type),
        author: String(author)
      } 
    };
    let result = {};
    await docClient.put(params).promise()
    .then((data) =>{
      result.data = data;
    }).catch((err) =>{
      result.err = err;
      console.error('BOOK SERVICE: Unble to create', JSON.stringify(err,null,2));
    })

    return result;
  }

  static async update(name, year, type, author){
    let params = {
      TableName: "Books",
      Key: {
        'name': String(name),
        'year': Number(year)
      },
      UpdateExpression: 'SET #t = :type, #a = :author',
      ExpressionAttributeNames: {
        '#t': 'type',
        '#a': 'author'
      },
      ExpressionAttributeValues: {
        ':type': String(type),
        ':author': String(author)
      },
      ReturnValues: 'UPDATED_NEW'
    }
    let result = {};
    await docClient.update(params).promise()
    .then((data) => {
      result.data = data;
    }).catch((err) =>{
      result.err = err;
      console.error("BOOK SERVICE: Unble to update", JSON.stringify(err, null, 2));
    })

    return result;
  }

  static async delete(name, year){
    let params = {
      TableName: "Books",
      Key: {
        'name': String(name),
        'year': Number(year)
      }
    }
    let result = {};
    await docClient.delete(params).promise()
    .then((data) =>{
      result.data = data;
    }).catch((err) =>{
      result.err = err;
      console.error("BOOK SERVICE: Unble to delete", JSON.stringify(err, null, 2));
    })

    return result;
  }
}