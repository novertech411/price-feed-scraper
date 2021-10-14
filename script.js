const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')


async function getPriceFeed() {
    try {
        const siteUrl = 'https://coinmarketcap.com/'

        const { data } = await axios({
            method: "GET",
            url:siteUrl,
        })

        const $ = cheerio.load(data)
        const elemSelector ='#__next > div > div.main-content > div.sc-57oli2-0.comDeo.cmc-body-wrapper > div > div:nth-child(1) > div.h7vnx2-1.bFzXgL > table > tbody > tr'
        
        
        $(elemSelector).each((parentIdx, parentElem) =>  {
             if (parentIdx <= 9) {
                 $(parentElem).children().each((childIdx, childElem) =>{
                     console.log($(childElem).text())
                 })
             }
        });


    } catch (err) {
    console.error(err)
    }
}



getPriceFeed()
