const express = require("express");
const app = express();
const puppeteer = require('puppeteer');

const a = (ms) =>
  new Promise(resolve => setTimeout(resolve, ms));





const PORT = 8080;

app.use(express.json())

app.get('/daily',(req,res)=>{
    const url = 'https://leetcode.com/problemset/all/';
    (async function scrape() {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        console.log("We are scraping from " + url + ":");

        await page.goto(url);
        await a(2000)
        let problem = await page.evaluate(() => {

            let prob = document.body.querySelector(' .truncate > a').href.split("/")[4].replaceAll("-", " ");
            return prob;
        });
        console.log(problem)
        res.status(200).send({
            msg:problem
        })
        browser.close();
        //console.log(hrefs);
    })().catch(function(err){
        console.log(err);
    });
})

app.get('/didthedaily/:username', (req, res)=>{

    const {username} = req.params
    const url1 = 'https://leetcode.com/problemset/all/';
    const url2 = `https://leetcode.com/${username}/`;
    (async function scrape() {
        const d = new Date();
        let time1 = d.getTime();

        const browser1 = await puppeteer.launch({ headless: true });
        const page1 = await browser1.newPage();
        console.log("We are scraping from " + url1 + ":");

        await page1.goto(url1);
        await a(2000)
        let problem = await page1.evaluate(() => {

            let prob = document.body.querySelector(' .truncate > a').href.split("/")[4].replaceAll("-", " ");
            return prob;
        });
        console.log(problem)
        browser1.close();

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        console.log("We are scraping from " + url2 + ":");

        await page.goto(url2);
        //await a(1000)
        let recents = await page.evaluate(() => {

            let prob = Array.from(document.body.querySelectorAll("a > div > .text-label-1"), el=> el.innerHTML.toLowerCase());
            return prob;
        });
        console.log(recents)
        browser.close();

        const done = recents.indexOf(problem)!=-1
        const d1 = new Date();
        let time2 = d1.getTime();

        res.status(200).send({
            msg:recents.toString(),
            prob: problem,
            done: done,
            time: time2-time1
        })
        //console.log(hrefs);
    })().catch(function(err){
        console.log(err);
    });
})


app.listen(
    PORT,
    ()=> console.log(`its alive on http://localhost:${PORT}`)
)

