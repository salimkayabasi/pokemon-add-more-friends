const puppeteer = require('puppeteer');

const POKEMON_GO_URL = 'https://www.fcswap.com/game/pokemon-go/';
const {POKEMON_CODE} = process.env;

const IS_CI = !!(process.env.CI);

process.on('unhandledRejection', error => {
    console.error(error);
    process.exit(error.code || 99);
});

(async () => {
    const browser = await puppeteer.launch({
        headless: IS_CI,
        defaultViewport: null
    });
    const page = await browser.newPage();
    await page.goto(POKEMON_GO_URL);
    await page.type('#codetext', POKEMON_CODE, {delay: 100});
    await page.$eval('input[name="submit"]', submit => submit.click());
    await browser.close();
})();