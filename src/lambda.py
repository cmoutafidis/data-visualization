import json
import os
import boto3
import time

client = boto3.client("dynamodb")


def lambda_handler(event, context):
    data = client.query(
        TableName="dynamo_test2",
        KeyConditionExpression="id = :id and #timestamp_field BETWEEN :timestamp_old and :timestamp",
        ExpressionAttributeValues={
            ":id": {
                "S": event["queryStringParameters"]['id']
            },
            ":timestamp": {
                "N": str(int(time.time())) + "000"
            },
            ":timestamp_old": {
                "N": event["queryStringParameters"]['timestamp']
            }
        },
        ExpressionAttributeNames={
            "#timestamp_field": 'timestamp',
            "#value_field": 'payload',
        },
        ProjectionExpression='#timestamp_field, #value_field',
    )
    return {
        "statusCode": 200,
        'headers': {
            'Content-Type': 'application/json',
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Methods": "*",
            "Access-Control-Allow-Origin": "*",
        },
        "body": json.dumps(data)
    }
