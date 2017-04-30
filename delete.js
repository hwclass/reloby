import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const params = {
    TableName: 'cities',
    // 'Key' defines the partition key and sort key of the time to be retrieved
    // - 'userId': federated identity ID of the authenticated user
    // - 'cityId': path parameter
    Key: {
      'userId': event.requestContext.authorizer.claims.sub,
      'cityId': event.pathParameters.id,
    },
  };

  try {
    const result = await dynamoDbLib.call('delete', params);
    // Delete the item
    callback(null, success({status: true}));
  }
  catch(e) {
    callback(null, failure({status: false}));
  }
};