const puppeteer = require('puppeteer');

const POKEMON_GO_URL = 'https://www.fcswap.com/game/pokemon-go/';
const {POKEMON_CODE} = process.env;

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    });
    const page = await browser.newPage();
    await page.goto(POKEMON_GO_URL);
    await page.type('#codetext', POKEMON_CODE, {delay: 100});
    await page.$eval('input[name="submit"]', submit => submit.click());
    await browser.close();
})();