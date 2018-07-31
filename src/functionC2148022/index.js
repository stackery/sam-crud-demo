const AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB()

exports.handler = async message => {
  console.log(message);

  if (message.body) {
    let userId = message.pathParameters.id
    let user = JSON.parse(message.body);
    let params = {
      TableName: process.env.TABLE_NAME,
      Item: {
        id: { S: userId },
        FirstName: { S: user.firstName },
        LastName: { S: user.lastName },
        FavoriteColor: { S: user.color }
      }
    };

    console.log(`Updating user ${userId} in table ${process.env.TABLE_NAME}`);
    await dynamodb.putItem(params).promise()
    console.log(`User added to table, done`);
  }

  return {
    statusCode: 204,
    headers: {},
    body: JSON.stringify({})
  };
}
