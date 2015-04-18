# -*- coding: utf-8 -*-
import scrapy
from scrapy.contrib.spiders import CrawlSpider
from scrapy.selector import Selector
from .. import items

class ImdbSpider(CrawlSpider):
    name = "imdb"
    allowed_domains = ["imdb.com"]
    start_urls = (
        'http://www.imdb.com/chart/top',
    )

    def parse(self, response):
        item = items.MovieItem()
        genres = response.css("div.aux-content-widget-2.links.subnav:nth-child(3) ul li a::text").extract()
        print genres

    def parse_movie(self, response):
        pass

    def parse_cast(self, response):
        pass
