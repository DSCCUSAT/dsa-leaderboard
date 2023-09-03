const express = require("express");
const app = express();
const puppeteer = require('puppeteer');
var cors = require('cors');
app.use(cors({origin: 'http://127.0.0.1:5500'}));

const PORT = process.env.PORT || 8080;

app.use(express.json())

app.get('/check/:username', (req, res)=>{

    const {username} = req.params
    const url2 = `https://leetcode.com/${username}/`;

    (async function scrape() {
        const d = new Date();
        let time1 = d.getTime();
        const browser = await puppeteer.launch({ headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();

        await page.goto(url2);
        
        let recents = await page.evaluate(() => {
            let prob = Array.from(document.body.querySelectorAll("a > div > .text-label-1"), el=> el.innerHTML.toLowerCase().replace(new RegExp(' ', 'g'),"-"));
            return prob;
        });
        
        browser.close();
        const d1 = new Date();
        let time2 = d1.getTime();

        res.status(200).send({
            username: username,
            recents:recents.toString(),
            time: time2-time1
        })

    })().catch(function(err){
        console.log(err);
    });
})


app.listen(
    PORT,
    ()=> console.log(`its alive on http://localhost:${PORT}`)
)

