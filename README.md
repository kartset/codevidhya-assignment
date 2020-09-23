# codevidhya-assignment

## Three Step Approach :-
1) Scraped the data using web scraping from different mooc websites.
2) Make a database of the scraped data.
3) Make a REST API to get that data.


## Step 1:
For the example purposes I have only scraped data from coursera website for 3 search results, C++, Java, and Python. After scraping them and storing them in a temp location I have stored them in a mongo database.
## Step 2:
I then made an REST API to send request to that database and generate responses using endpoints.

## Project Structure
* Assignment
  

## To generate the results, follow these steps :

1) Clone this repo.  
2) Navigate to the quotetutorial directory :-  

``` $ cd scrapy/quotetutorial```

3)Execute the following terminal command. It will create a mongodb collection which contains all the scraped results.  
``` $ scrapy crawl quotes```  
4)Navigate to the home project folder.  
``` $ cd <route to the assignment folder>```  
5)To install the necessary packages. Execute the following command:  
``` $ npm install```  
6)To run the REST API :-  
``` $ npm start```  
