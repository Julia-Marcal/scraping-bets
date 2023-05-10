const pup = require('puppeteer')

const sofascore_home = "https://www.sofascore.com/";

export async function bestGames( allowed_leagues: string[]) {
  const browser = await pup.launch({ headless: false})
  const page = await browser.newPage()

  await page.goto(sofascore_home)
  await page.waitForSelector('div.sc-bqWxrE.eljiF')
  const leagues = await page.$$('div.sc-bqWxrE.eljiF');

  const innerTexts: string[] = await Promise.all(
    leagues.map(async (league) => {
      const innerText = await page.evaluate(el => el.innerText, league);
      if(allowed_leagues.includes(innerText)){
        console.log(innerText)
        return innerText;
      }
    })
  );

  await browser.close()
  return innerTexts

}
