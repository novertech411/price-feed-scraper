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
        const Keys = [
            'rank',
            'name',
            'price',
            '24h',
            '7d',
            'marketCap',
            'volume',
            'circulatingSupply'

        ]
        
        $(elemSelector).each((parentIdx, parentElem) =>  {
            let KeyIdx = 0;
            const coinObj = {};

             if (parentIdx <= 9) {
                 $(parentElem).children().each((childIdx, childElem) =>{
                     const tdValue = $(childElem).text()

                     if (tdValue){
                       coinObj(Keys[KeyIdx]) = tdValue 

                       KeyIdx++
                     }
                 })
             }
             console.log(coinObj)
        });   

    } catch (err) {
    console.error(err)
    }
}



getPriceFeed()
