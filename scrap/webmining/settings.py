# -*- coding: utf-8 -*-

# Scrapy settings for webmining project
#
# For simplicity, this file contains only the most important settings by
# default. All the other settings are documented here:
#
#     http://doc.scrapy.org/en/latest/topics/settings.html
#

BOT_NAME = 'webmining'

SPIDER_MODULES = ['webmining.spiders']
NEWSPIDER_MODULE = 'webmining.spiders'

ITEM_PIPELINES = {
    'webmining.pipelines.MoviesPipeline': 100
}

DOWNLOAD_DELAY = 1
HTTPCACHE_ENABLED = True
