import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'cities',
    Key: {
      userId: event.requestContext.authorizer.claims.sub,
      cityId: event.pathParameters.id,
    },
    UpdateExpression: 'SET content = :content, attachment = :attachment',
    ExpressionAttributeValues: {
      ':attachment': data.attachment ? data.attachment : null,
      ':content': data.content ? data.content : null,
    },
    ReturnValues: 'ALL_NEW'
  }

  try {
    const result = await dynamoDbLib.call('update', params);
    // Update the item
    callback(null, success({result: true}));
  }
  catch(e) {
    callback(null, failure({status: false}));
  }
}