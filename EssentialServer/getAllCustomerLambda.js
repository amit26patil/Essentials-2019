const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient({ region: "ap-south-1" });

exports.handler = function(event, context, callback) {
  console.log("processing event: %j", event);

  let scanningParameters = {
    TableName: "Customer",
    Limit: 100 //maximum result of 100 items
  };

  //In dynamoDB scan looks through your entire table and fetches all data
  docClient.scan(scanningParameters, function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};
