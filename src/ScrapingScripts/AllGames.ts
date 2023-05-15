import { browser } from './enterAccount';

const sofascore_game = "https://www.sofascore.com";

export async function bestGames(allowed_leagues: string[]) {
  const mainPageTeam = await browser.waitForTarget(target => target.url().includes('sofascore.com'));
  let mainPage = await mainPageTeam.page();
  await mainPage.setDefaultNavigationTimeout(0);

  const games = await mainPage.$$('.sc-hLBbgP.dRtNhU a[class^="sc-29ae2005-0 exLNMv"]');

  const hrefs = await Promise.all(
    games.map(async (game) => {
      const href = await mainPage.evaluate(el => el.getAttribute('href'), game);
      return href;
    })
  );

  const links = [];
  const allowed_games = []

  for (let i = 0; i < hrefs.length; i++) {
    const href = hrefs[i];
    await mainPage.goto(sofascore_game + href);
    const leagueElement = await mainPage.$('.sc-bqWxrE.bktcYk');
    const LeagueOfGame = await mainPage.evaluate(el => el.innerText, leagueElement);
    links.push({ link: href, league: LeagueOfGame });
  }

  for (let j = 0; j < links.length; j++) {
    if (allowed_leagues.includes(links[j].league)){
      allowed_games.push(links[j])
    }
  }

  return allowed_games
}
