const express = require("express");
const app = express();
const puppeteer = require('puppeteer');

const PORT = process.env.PORT || 8080;

app.use(express.json())

app.get('/check/:username/:problem', (req, res)=>{

    const {username, problem} = req.params

    const url2 = `https://leetcode.com/${username}/`;

    (async function scrape() {
        const d = new Date();
        let time1 = d.getTime();
        const browser = await puppeteer.launch({ headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();

        //console.log("We are scraping from " + url2 + ":");

        await page.goto(url2);
        
        let recents = await page.evaluate(() => {
            let prob = Array.from(document.body.querySelectorAll("a > div > .text-label-1"), el=> el.innerHTML.toLowerCase().replace(" ","-"));
            return prob;
        });
        
        //console.log(recents)
        browser.close();

        const done = recents.indexOf(problem)!=-1
        const d1 = new Date();
        let time2 = d1.getTime();

        res.status(200).send({
            recents:recents.toString(),
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

