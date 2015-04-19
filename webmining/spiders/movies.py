# -*- coding: utf-8 -*-
import scrapy
from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
from scrapy.selector import Selector
from scrapy import Request
from .. import items

class MoviesSpider(scrapy.Spider):
    name = "movies"
    allowed_domains = ["imdb.com"]
    start_urls = (
        'http://www.imdb.com/chart/top',
    )

    def parse(self, response):
        movie_links = response.css("tbody.lister-list tr td.titleColumn a::attr(href)").extract()
        base_comment_url = "http://www.imdb.com/%s"
        for link in movie_links:
            yield Request(base_comment_url % link, self.parse_movie)

    def parse_movie(self, response):
        item = items.MovieItem()
        url = response.url
        item['imdbid'] = url[27:36]
        item['title'] = response.css("td#overview-top h1.header span.itemprop::text").extract()[0]
        item['year'] = response.css("td#overview-top h1.header span.nobr a::text").extract()[0]
        item['rating'] = response.css("div.star-box-giga-star::text").extract()[0].strip()
        item['director'] = response.css("div[itemprop=director] a span::text").extract()[0]
        item['place'] = response.css("div#titleAwardsRanks a strong::text").extract()[0].split('#')[1]
        item['genres'] = response.css("div.infobar span[itemprop=genre]::text").extract()
        cast_url = "http://www.imdb.com/title/%s/fullcredits"
        yield Request(cast_url % item['imdbid'], self.parse_cast, meta={'item': item})

    def parse_cast(self, response):
        item = response.meta["item"]
        print item['place']
