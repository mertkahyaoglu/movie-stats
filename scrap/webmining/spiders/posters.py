# -*- coding: utf-8 -*-
import scrapy
from scrapy.selector import Selector
from scrapy import Request
from .. import items

class PostersSpider(scrapy.Spider):
    name = "posters"
    allowed_domains = ["imdb.com"]
    start_urls = (
        'http://www.imdb.com/chart/top',
    )

    def parse(self, response):
        movie_links = response.css("tbody.lister-list tr td.titleColumn a::attr(href)").extract()
        base_url = "http://www.imdb.com/%s"
        for link in movie_links:
            yield Request(base_url % link, self.parse_movie)

    def parse_movie(self, response):
        item = items.PosterItem()
        url = response.url
        item['imdbid'] = url[27:36]
        item['image_urls'] = response.css("div.image img[itemprop=image]::attr(src)").extract()
        return item
