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

  const scraped_games = []

  for (let i = 0; i < hrefs.length; i++) {
    const href = hrefs[i];
    await mainPage.goto(sofascore_game + href);
    const leagueElement = await mainPage.$('.sc-bqWxrE.bktcYk');
    const LeagueOfGame = await mainPage.evaluate(el => el.innerText, leagueElement);

    //Checking Country of League
    //Algebria League has the same name as french league
    const CountryElements = await mainPage.$$('ul.sc-7f0dfe57-0.jIuhdu li');
    const CountryLiElements = CountryElements[1];
    const CountryText = await mainPage.evaluate(element => element.innerText, CountryLiElements);
    
    if(allowed_leagues.includes(LeagueOfGame)){
      if(LeagueOfGame == 'Ligue 1' && CountryText !== 'France'){
        break
      }
      scraped_games.push({ link: href, league: LeagueOfGame });
    }
  }

  return scraped_games
}
