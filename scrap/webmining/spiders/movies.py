# -*- coding: utf-8 -*-
import scrapy
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
        base_url = "http://www.imdb.com/%s"
        for link in movie_links:
            yield Request(base_url % link, self.parse_movie)

    def parse_movie(self, response):
        item = items.MovieItem()
        url = response.url
        item['imdbid'] = url[27:36]
        item['title'] = response.css("td#overview-top h1.header span.itemprop::text").extract()[0]
        item['year'] = response.css("td#overview-top h1.header span.nobr a::text").extract()[0]
        item['rating'] = response.css("div.star-box-giga-star::text").extract()[0].strip()
        item['director'] = response.css("div[itemprop=director] a span::text").extract()[0]
        item['place'] = int(response.css("div#titleAwardsRanks a strong::text").extract()[0].split('#')[1])
        item['genres'] = response.css("div.infobar span[itemprop=genre]::text").extract()
        item['cast'] = response.css("table.cast_list tr td[itemprop=actor] a span::text").extract()
        item['poster'] = response.css("div.image img[itemprop=image]::attr(src)").extract()[0]
        item['plot'] = response.css("p[itemprop=description]::text").extract()[0]

        rating = response.css(".star-box-details a::attr(href)").extract()[0]
        rating_url = "http://www.imdb.com/title/" + item['imdbid'] + "/" + rating
        yield Request(rating_url, self.parse_ratings, meta={'item': item})

    def parse_ratings(self, response):
        item = response.meta["item"]
        rating_table = response.css("div#tn15content :nth-child(6) td[align=right]::text").extract()[1:-3]
        item['rating_table'] = rating_table
        return item
