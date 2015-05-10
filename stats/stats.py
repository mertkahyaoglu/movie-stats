# -*- coding: utf-8 -*-
import json
import operator
import copy

def export_json(filename, data):
    with open(filename, "w") as output:
        output.write(json.dumps(data))

with open('../scrap/movies.json') as f:
	data = json.load(f)

directors_cast = {}
for item in data:
	if item['director'] in directors_cast:
		for person in item['cast']:
			tuple = (person, item['title'])
			directors_cast[item['director']].append(tuple)
	else:
		directors_cast[item['director']] = [(person, item['title']) for person in item['cast']]

years_count = {}
for item in data:
	if item['year'] in years_count:
		years_count[item['year']] += 1
	else:
		years_count[item['year']] = 1

#delete below 3
years = copy.deepcopy(years_count)
for year in years:
	if years_count[year] < 6:
		del years_count[year]

directors_count = {}
for item in data:
	if item['director'] in directors_count:
		directors_count[item['director']] += 1
	else:
		directors_count[item['director']] = 1

#delete below 3
directors = copy.deepcopy(directors_count)
for director in directors:
	if directors_count[director] < 5:
		del directors_count[director]

actors_count = {}
for item in data:
	for p in item['cast']:
		if p in actors_count:
			actors_count[p] += 1
		else:
			actors_count[p] = 1

#delete below 3
actors = copy.deepcopy(actors_count)
for actor in actors:
	if actors_count[actor] < 5:
		del actors_count[actor]

cast_genres = {}
for item in data:
	for p in item['cast']:
		if p not in cast_genres:
			cast_genres[p] = []
		for genre in item['genres']:
			isIn = False
			for arr in cast_genres[p]:
				if arr.keys()[0] == genre:
					isIn = True 
			if isIn:
				arr[arr.keys()[0]] += 1
			else:
				cast_genres[p].append({genre: 1})
				
export_json('../webpage/data/directors-cast.json', directors_cast)
export_json('../webpage/data/years-count.json', years_count)
export_json('../webpage/data/directors-count.json', directors_count)
export_json('../webpage/data/actors-count.json', actors_count)
export_json('../webpage/data/cast-genres.json', cast_genres)







