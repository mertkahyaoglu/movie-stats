# -*- coding: utf-8 -*-
import json

with open('../scrap/movies.json') as f:
	data = json.load(f)

directors_data = {}
for item in data:
	if item['director'] in directors_data:
		for person in item['cast']:
			tuple = (person, item['title'])
			directors_data[item['director']].append(tuple)
	else:
		directors_data[item['director']] = [(person, item['title']) for person in item['cast']]

print directors_data