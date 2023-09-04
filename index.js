const express = require("express");
const app = express();
const puppeteer = require('puppeteer');
var cors = require('cors');
app.use(cors({origin: 'http://127.0.0.1:5501'}));

const { LeetCode } = require("leetcode-query");




app.get('/check/:username', (req, res)=>{
    const d = new Date();
    let time1 = d.getTime();
    const {username} = req.params
    const leetcode = new LeetCode();
    leetcode.user(username).then((user)=>{
        if (user.recentSubmissionList == null){
            const d1 = new Date();
            let time2 = d1.getTime();
            res.status(200).send({
                username: username,
                recents:"",
                time: time2-time1
            })
        }
        else {
            /**
            recents = Array.from(user.recentSubmissionList, el=>{
                if (el.statusDisplay == "Accepted"){el.title.toLowerCase().replace(new RegExp(' ', 'g'),"-")}
            })
             */
            recents = []
            for (i in user.recentSubmissionList){
                el = user.recentSubmissionList[i]
                if (el.statusDisplay == "Accepted"){
                   var k = el.title.toLowerCase().replace(new RegExp(' ', 'g'),"-")
                   recents.push(k)
                }
            }
            const d1 = new Date();
            let time2 = d1.getTime();
            recents = Array.from(new Set(recents))
            res.status(200).send({
                username: username,
                recents:recents.toString(),
                time: time2-time1
            })
        }
        
    })

})

const PORT = process.env.PORT || 8080;

app.use(express.json())

const joptions = {
    "headers": {
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7", 
      "Accept-Encoding": "gzip, deflate, br", 
      "Accept-Language": "en-US,en;q=0.9", 
      "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36", 
    }
  }

  /**
app.get('/check/:username', (req, res)=>{

    const {username} = req.params
    const url2 = `https://leetcode.com/${username}/`;

    (async function scrape() {
        const d = new Date();
        let time1 = d.getTime();
        const browser = await puppeteer.launch({ headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();

        await page.setExtraHTTPHeaders(joptions.headers);
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
 */


app.listen(
    PORT,
    ()=> console.log(`its alive on http://localhost:${PORT}`)
)

