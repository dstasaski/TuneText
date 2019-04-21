import requests


class Spotify:
    token_url = 'https://accounts.spotify.com/api/token'

    def __init__(self):
        self.CLIENT_ID, self.CLIENT_SECRET = self.read_secrets()
        self.token_expire = 0

    @staticmethod
    def read_secrets():
        with open('secret.txt') as f:
            return f.readline().strip().split(':')

    def get_token(self):
        # TODO add token expire logic
        data = {'grant_type': 'client_credentials'}
        response = requests.post(self.token_url, auth=(self.CLIENT_ID, self.CLIENT_SECRET), data=data)
        return response.json()['access_token']

    def browse_category(self, category):
        return {'token': self.get_token()}
