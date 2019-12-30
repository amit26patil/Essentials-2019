const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: "ap-south-1" });
//const uuid = require('uuid');
exports.handler = function(event, context, callback) {
  console.log("processing event: " + JSON.stringify(event, null, 2));
  let params = {
    Item: {
      id: context.awsRequestId,
      name: event.name,
      email: event.email,
      phone: event.phone
    },
    TableName: "Customer"
  };

  docClient.put(params, function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};
