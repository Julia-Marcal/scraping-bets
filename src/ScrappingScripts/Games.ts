import { browser } from './enterAccount';

export async function bestGames(allowed_leagues: string[]) {
  const mainPageTeam = await browser.waitForTarget(target => target.url().includes('sofascore.com'));
  let mainPage = await mainPageTeam.page();

  const games = await mainPage.$$('.sc-hLBbgP.dRtNhU a[class^="sc-29ae2005-0 exLNMv"]');

  const hrefs = await Promise.all(
    games.map(async (game) => {
      const href = await mainPage.evaluate(el => el.getAttribute('href'), game);
      return href;
    })
  );

  console.log(hrefs); // prints "/cadiz-mallorca/BgbsNOb"

  browser.close()
}
