
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

module.exports.extractAndWriteToFile = async function extractAndWriteToFile(url) {

    return new Promise(async (resolve, reject) => {

        var browser
        let tags
        try {

            browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);
            // const htmlContent = await page.content();
            const bodyContent = await page.$eval('body', body => body.innerHTML);
            tags = await fetchtag_names(bodyContent)

        } catch (error) {

            console.error('Error:', error);
           return reject({
                status: 0,
                data: []
            })

        } finally {
            // Close the browser
            browser && await browser.close();
          return  resolve({
                status: 1,
                data: tags
            })

        }
    })

}


let fetchtag_names = async (html) => {

    return new Promise(async (resolve, reject) => {
        try {
            let tagarray = []
            const $ = cheerio.load(html);
            $('.post-tag').each(async (index, element) => {
                tagarray.push($(element).text().trim());
            })
           return resolve({
                status: 1,
                tags: tagarray
            })
        } catch (error) {
            console.log("console--->> ~ error:", error)

           return reject({
                status: 0,
                tags: []
            })
        }

    })
}


