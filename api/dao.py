import boto3
import yaml
import random, string
from boto3.dynamodb.conditions import Key, Attr


class Dao:
    def __init__(self):
        with open("config/dao-properties.yml", 'r') as stream:
            properties = yaml.safe_load(stream)

        self.dynamodb = boto3.resource(service_name=properties['type'], region_name=properties['region_name'])
        self.table = self.dynamodb.Table(properties['playerTable'])
        self.id_length = 4

    def store_player(self, text, song_name):
        gen_id = self.generate_id()
        while self.id_exists(id):
            gen_id = self.generate_id()

        self.table.put_item(
            Item={
                'id': gen_id,
                'text': text,
                'song_name': song_name
            }
        )
        response = {'id': gen_id}
        return response

    def get_player(self, player_id):
        player_id = player_id.upper()
        response = self.table.query(
            KeyConditionExpression=Key('id').eq(player_id)
        )

        json_res = {'error': 'Key does not exist in DB'}

        if 'Items' in response:
            json_res = {'text': response['text'][0], 'song_name': response['song_name'][0]}

        return json_res

    def id_exists(self, generated_id):
        db_res = self.get_player(generated_id)
        return 'error' not in db_res

    def generate_id(self):
        return ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(self.id_length))
