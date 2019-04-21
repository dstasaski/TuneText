import requests


class Spotify:
    token_url = 'https://accounts.spotify.com/api/token'
    browse_category_url = 'https://api.spotify.com/v1/browse/categories/{category_id}/playlists?limit=1'

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
        response = requests.post(url=self.token_url, auth=(self.CLIENT_ID, self.CLIENT_SECRET), data=data)
        return response.json()['access_token']

    def browse_category(self, category):
        url = self.browse_category_url.replace('{category_id}', category)
        headers = {'Authorization': 'Bearer ' + self.get_token()}
        response = requests.get(url=url, headers=headers)
        return response.json()
