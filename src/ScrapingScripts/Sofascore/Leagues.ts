import { browser } from './enterAccount'


export async function bestLeagues( allowed_leagues: string[], sofascore_link) {
  const mainPageTarget = await browser.waitForTarget(target => target.url().includes('sofascore.com'));
  let mainPage = await mainPageTarget.page();
  await mainPage.goto(sofascore_link);

  await mainPage.waitForSelector('div.sc-bqWxrE.eljiF');
  const leagues = await mainPage.$$('div.sc-bqWxrE.eljiF');

  const innerTexts: string[] = await Promise.all(
    leagues.map(async (league) => {
      const innerText = await mainPage.evaluate(el => el.innerText, league);
      if(allowed_leagues.includes(innerText)){
        return innerText;
      }
    })
    );

  return innerTexts
}
