
# Project Name

Scrap-data-from-stackoverflow 

Objective:

Create a web scraping and API project that fetches tags from Stack Overflow, stores them in a database, and provides APIs to view the tags.

# Web Scraping:

Use a web scraping library (e.g., Puppeteer or Cheerio) to fetch the list of tags from the Stack Overflow tags page (e.g., https://stackoverflow.com/tags).
Extract relevant information such as tag name, total questions, total views, total votes, etc.
Store the extracted information in a database (MongoDB is a good choice).

## Installation

npm i 

## run commond 



 run common will be ----> "node app.js" 

## Usage

STEP 1 :

The Data from StackOverflow will be scraped and stored in mongoDb

Seeding APIs

Method : GET

http://localhost:8080/scrapdata/scraptagData 


STEP 2 :

Get All tag from Database

Method : GET

http://localhost:8080/scrapdata/gettags




STEP : 3 

Note : Pass the _id of the particular which will be get from previous responce 

Method : POST

http://localhost:8080/scrapdata/gettagsById

request : 

{

    "tagid":"MongoDb-Obj-id"
}






Other Ideas To Implements in furture 

*--> Socket.io connections implementation 

*--> Limit Req Size 

*--> Make as Micro-server architecture

*--> Implementation Of redis 

*--> JWT Token Implementaion 






