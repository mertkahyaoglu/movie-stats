# -*- coding: utf-8 -*-
import scrapy

class GenresSpider(scrapy.Spider):
    name = "genres"
    allowed_domains = ["imdb.com"]
    start_urls = (
        'http://www.imdb.com/chart/top',
    )

    def parse(self, response):
        item = items.GenreItem()
        item['genre'] = response.css("div.aux-content-widget-2.links.subnav:nth-child(3) ul li a::text").extract()
        return item
