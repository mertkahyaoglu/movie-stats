# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/en/latest/topics/items.html

import scrapy

class PosterItem(scrapy.Item):
	imdbid = scrapy.Field()
	image_urls = scrapy.Field()
	images = scrapy.Field()

class MovieItem(scrapy.Item):
	imdbid = scrapy.Field()
	title = scrapy.Field()
	year = scrapy.Field()
	rating = scrapy.Field()
	director = scrapy.Field()
	place = scrapy.Field()
	genres = scrapy.Field()
	cast = scrapy.Field()
	poster = scrapy.Field()
	plot = scrapy.Field()
	rating_table = scrapy.Field()
