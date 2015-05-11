# -*- coding: utf-8 -*-
import json
from scrapy.contrib.pipeline.images import ImagesPipeline
from scrapy.http import Request

# Pipeline for movies' data
class MoviesPipeline(object):
    def __init__(self):
        self.file = open('movies.json', 'wb')

    def process_item(self, item, spider):
        line = json.dumps(dict(item)) + ",\n"
        self.file.write(line)
        return item

# Pipeline for downloading images
"""
class ImagesPipeline(ImagesPipeline):
    def file_path(self, request, response=None, info=None):
        image_guid = request.meta['imdbid'] + ".jpg"
        return 'full/%s' % (image_guid)

    def get_media_requests(self, item, info):
        yield Request(item['image_urls'][0], meta=item)
"""
