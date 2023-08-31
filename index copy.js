const express = require("express");
const puppeteer = require('puppeteer');


async function scrape(username, problem) {

    const url2 = `https://leetcode.com/${username}/`;
    
    const d = new Date();             //start timer
    let time1 = d.getTime();


    const browser = await puppeteer.launch({ headless: true,args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();

    await page.goto(url2);
    

    let recents = await page.evaluate(() => {

        let prob = Array.from(document.body.querySelectorAll("a > div > .text-label-1"), el=> el.innerHTML.toLowerCase().replace(" ","-"));
        return prob;
    });

    browser.close();

    const done = recents.indexOf(problem)!=-1


    const d1 = new Date();              //end timer     
    let time2 = d1.getTime();

    return Promise.resolve({"done":done, "time":time2-time1, "recents":recents})

}


usernames = ["Mishal0404"]
questions = ["two-sum"]


for (i in usernames){
    for (j in questions){
        result = scrape(usernames[i], questions[j])
    }
}
scrape("Mishal0404", "two-sum").then((e)=>{console.log(e)})
