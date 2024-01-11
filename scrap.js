const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
var axios = require("axios");
// const mongoose = require('mongoose');
const express = require('express');
const app = express();
const fs = require('fs').promises; // Using the promises version for asynchronous file operations
    var browser


async function extractAndWriteToFile(url, filePath) {
    try {
browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto(url);
    const htmlContent = await page.content();
    await page.waitForSelector('.grid--cell.s-anchors.v-visible-sr');

    // Extract the HTML content
    // const bodyContent = await page.$eval('body', body => body.innerHTML);
    senddata(htmlContent)

    await fs.writeFile(filePath, bodyContent, 'utf-8');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the browser
    browser && await browser.close();

  }
}

// Example usage
const filePath = 'programming-lang.html';
// let url = 'https://stackoverflow.com/search?q=most+popular+programming+language'
// let url = 'https://stackoverflow.com/tags'
let url = `https://stackoverflow.com/tags/${encodeURIComponent('javascript')}`


extractAndWriteToFile(url, filePath);


async function senddata(filePath){
console.log("console--->> ~ filePath:", filePath)

    // readFromFile(filePath)
        // .then(async fileContent => {
            // console.log("console--->> ~ fileContent:", fileContent)
           
// let html = `${fileContent}`
            const $$ =  cheerio.load(filePath);
            // console.log("console--->> ~  $:",  $)
            // const paragraphText = $('div p').text();
            // console.log("console--->> ~ paragraphText:", paragraphText)
            // const topicSelector = 'div span.svg-icon iconAnswer';
            // const topicTitle = $(topicSelector).text().trim();
            // console.log('Extracted Topic Title:', topicTitle);

            // $(topicTitle).each((index, element) => {
            //     const ss = $(element).text().trim();
            //     console.log(`Topic ${index + 1}: ${ss}`);
            // });
    //  const topicSelector = '.post-tag';
    //         const topicTitle = $(topicSelector).text().trim();
    //         $('.post-tag').each(async (index, element) => {
    //             const page = await browser.newPage();
    //             const topic = $(element).text().trim();
    //             const tagUrl = `https://stackoverflow.com/tags/${encodeURIComponent('javascript')}`;
    //             await page.goto(tagUrl);
            
    //             // Extract the HTML content
    //             const htmlContent = await page.content();
            
    //             // Load HTML content into Cheerio
    //             const $$ = cheerio.load(htmlContent);
            
                // Extract and print the tag details
                const totalViews = $$('.fc-light').eq(0).text().trim();
                const totalVotes = $$('.fc-light').eq(1).text().trim();
                const totalQuestions = $$('.grid--cell.s-anchors.v-visible-sr').text().trim();
            
                // console.log(`Tag: ${tag}`);
                console.log(`Total Views: ${totalViews}`);
                console.log(`Total Votes: ${totalVotes}`);
                console.log(`Total Questions: ${totalQuestions}\n`);
            
                await browser.close();
                // console.log(`Topic ${index + 1}: ${topic}`);
            //   });
        // })
        // .catch(error => {
        //     console.error('Error:', error);
        // });




}
     



async function readFromFile(filePath) {
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    return fileContent;
  } catch (error) {
    console.error('Error:', error);
  }
}



