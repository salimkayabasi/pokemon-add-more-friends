const puppeteer = require('puppeteer');

const {POKEMON_CODE, CI = false} = process.env;
const FCSWAP_URL = 'https://www.fcswap.com/game/pokemon-go/';
const PGFC_URL = 'https://www.pokemongofriendcodes.com/'

const IS_CI = !!CI;

process.on('unhandledRejection', error => {
    console.error(error);
    process.exit(error.code || 99);
});

const getPage = async (url) => {
    const browser = await puppeteer.launch({
        headless: IS_CI,
        defaultViewport: null
    });
    const page = await browser.newPage();
    await page.goto(url);
    return {browser, page};
};

const addToFCSWAP = async () => {
    const {browser, page} = await getPage(FCSWAP_URL);
    await page.type('#codetext', POKEMON_CODE, {delay: 100});
    await page.$eval('input[name="submit"]', button => button.click());
    await browser.close();
};
const addToPGFC = async () => {
    const {browser, page} = await getPage(PGFC_URL);
    await page.type('#inputFriendCode', POKEMON_CODE, {delay: 100});
    await page.$eval('#inputFcForm button', button => button.click());
    await browser.close();
};
(async () => {
    await addToFCSWAP();
    await addToPGFC();
})();