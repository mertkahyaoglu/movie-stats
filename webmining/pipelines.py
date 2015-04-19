# -*- coding: utf-8 -*-
import MySQLdb as mdb
import sys

class MoviesPipeline(object):
    def process_item(self, item, spider):
        return item

class GenresPipeline(object):
    def __init__(self):
    try:
        self.con = mdb.connect('localhost', 'web_mining', 'root', '');
        self.cur = self.con.cursor()
    except mdb.Error, e:
        print "Error %d: %s" % (e.args[0],e.args[1])
    sys.exit(1)

    def process_item(self, item, spider):
        try:
            self.cur.execute("INSERT INTO genres(genre) VALUES('%s')" % item["genre"])
            self.con.commit()
            return item

        except mdb.Error, e:
            print "Error %d: %s" % (e.args[0],e.args[1])
            sys.exit(1)
