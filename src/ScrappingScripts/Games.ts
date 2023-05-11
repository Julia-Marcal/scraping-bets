import { browser } from './enterAccount';

export async function bestGames(allowedLeagues: string[]) {
  const mainPageTeam = await browser.waitForTarget(target => target.url().includes('sofascore.com'));
  let mainPage = await mainPageTeam.page();

  await mainPage.waitForSelector('div.sc-hLBbgP.iMgwiw');
  const games = await mainPage.$$('div.sc-hLBbgP.iMgwiw');

  browser.close()
}
