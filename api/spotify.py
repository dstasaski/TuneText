# import requests


class Spotify:
    def __init__(self):
        self.CLIENT_ID, self.CLIENT_SECRET = self.read_secrets()

    def read_secrets(self):
        with open('secret.txt') as f:
            return f.readline().strip().split(':')

    def browse_category(self, category):
        # print(self.CLIENT_ID, self.CLIENT_SECRET, category)
        return {'CLIENT_ID': self.CLIENT_ID, 'CLIENT_SECRET': 'ahha'}
