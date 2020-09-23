import scrapy
from ..items import QuotetutorialItem
from re import  search

class QuoteSpider(scrapy.Spider):
    name = 'quotes'
    start_urls = [
        'https://www.coursera.org/search?query=c%2B%2B&',
        'https://www.coursera.org/search?query=java&',
        'https://www.coursera.org/search?query=python&'
    ]
    def parse(self, response):

        items = QuotetutorialItem()
        
        all_div = response.css('div.card-content')
        
        for div in all_div:
            title = div.css('.headline-1-text::text').extract()
            provider = div.css('.m-b-1s::text').extract()
            tpe = div.css('._1d8rgfy3::text').extract()
            rating = div.css('span.ratings-text::text').extract()
            enroll = div.css('span.enrollment-number::text').extract()

            title = ' '.join(map(str, title))
            provider = ' '.join(map(str, provider))
            tpe = ' '.join(map(str, tpe))
            rating = ' '.join(map(str, rating))
            enroll = ' '.join(map(str, enroll))

            if 'Python' in title:
                tag = 'Python'
            elif "Java" in title:
                tag = 'Java'
            else:
                tag = 'C++'

            if (title == "" or provider == "" or tpe == "" or rating == "" or enroll == ""):
                pass
            else:
                items['title'] = title
                items['provider'] = provider
                items['tpe'] = tpe
                items['rating'] = rating
                items['enroll'] = enroll
                items['tag'] = tag
                yield items