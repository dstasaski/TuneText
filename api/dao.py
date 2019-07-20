import boto3
import yaml
import random
import string
import datetime
from boto3.dynamodb.conditions import Key, Attr


class Dao:
    def __init__(self):
        with open("config/dao-properties.yml", 'r') as stream:
            properties = yaml.safe_load(stream)

        self.dynamodb = boto3.resource(service_name=properties['type'], region_name=properties['region_name'])
        self.table = self.dynamodb.Table(properties['playerTable'])
        self.id_length = 4

    def store_player(self, text, song_name, emotion):
        gen_id = self.generate_id(text)
        while self.id_exists(gen_id):
            gen_id = self.generate_id(text)

        now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.table.put_item(
            Item={
                'id': gen_id,
                'text': text,
                'song_name': song_name,
                'emotion': emotion,
                'creation_time': now
            }
        )
        response = {'id': gen_id}
        return response

    def get_player(self, player_id):
        player_id = player_id.upper()
        response = self.table.query(
            KeyConditionExpression=Key('id').eq(player_id)
        )

        items = response['Items']
        if items:
            json_res = {'text': items[0]['text'], 'song_name': items[0]['song_name'],
                        'emotion': items[0]['emotion'], 'creation_time': items[0]['creation_time']}
        else:
            json_res = {'error': 'Key does not exist in DB'}

        return json_res

    def id_exists(self, generated_id):
        db_res = self.get_player(generated_id)
        return 'error' not in db_res

    def generate_id(self, text):
        random.seed(text)
        return ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(self.id_length))
