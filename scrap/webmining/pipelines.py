# -*- coding: utf-8 -*-
import json

class MoviesPipeline(object):
    def __init__(self):
        self.file = open('movies.jl', 'wb')

    def process_item(self, item, spider):
        line = json.dumps(dict(item)) + "\n"
        self.file.write(line)
        return item
