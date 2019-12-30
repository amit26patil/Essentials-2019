const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: "ap-south-1" });
//const uuid = require('uuid');
exports.handler = function(event, context, callback) {
  console.log("processing event: " + JSON.stringify(event, null, 2));
  let params = {
    Key: {
      id: event.id
    },
    TableName: "Customer",
    UpdateExpression: "set #a = :name, #b = :phone",
    ExpressionAttributeNames: { "#a": "name", "#b": "phone" },
    ExpressionAttributeValues: { ":name": event.name, ":phone": event.phone }
  };

  docClient.update(params, function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};
