# -*- coding: utf-8 -*-

# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html
# Extracted data --> Temp containers (items) --> Storing in database

import scrapy


class QuotetutorialItem(scrapy.Item):
    # define the fields for your item here like:
    # name = scrapy.Field()
    title = scrapy.Field()
    provider = scrapy.Field()
    tpe = scrapy.Field()
    rating = scrapy.Field()
    enroll = scrapy.Field()
    tag = scrapy.Field()
    
