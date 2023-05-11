const pup = require('puppeteer')
import { browser } from './enterAccount'

const sofascore_home = "https://www.sofascore.com/";

export async function bestLeagues( allowed_leagues: string[]) {
  const mainPageTarget = await browser.waitForTarget(target => target.url().includes('sofascore.com'));
  let mainPage = await mainPageTarget.page();
  await mainPage.goto(sofascore_home);

  await mainPage.waitForSelector('div.sc-bqWxrE.eljiF');
  const leagues = await mainPage.$$('div.sc-bqWxrE.eljiF');

  const innerTexts: string[] = await Promise.all(
    leagues.map(async (league) => {
      const innerText = await mainPage.evaluate(el => el.innerText, league);
      if(allowed_leagues.includes(innerText)){
        console.log(innerText)
        return innerText;
      }
    })
    );

  await mainPage.close()
  await browser.close()
  return innerTexts
}
