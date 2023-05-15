import { browser } from './enterAccount';
const sofascore = "https://www.sofascore.com/"

export async function ScrapingAllowedGames(allowed_games:  string[]) {
  const GamePageTarget = await browser.waitForTarget(target => target.url().includes('sofascore.com'));
  const GamePage = await GamePageTarget.page();

  const games = [];

  for(let i = 0; i < allowed_games.length; i++){
    await GamePage.goto(sofascore + allowed_games[i].link);
    const GameOdds = await GamePage.$$('div.sc-hLBbgP.sc-eDvSVe.gjJmZQ.fRddxb');
    const TeamsOnGame = await GamePage.$('span.sc-bqWxrE.bKWHTo')
    const TeamsOnGameText = await GamePage.evaluate(el => el.innerText, TeamsOnGame)

    let FirstOdd, TieOdd, SecondOdd;

    for(let j = 0; j < 3; j++){
      const GameOddText = await GamePage.evaluate(el => el.innerText, GameOdds[j]);
      if(j == 0){FirstOdd = GameOddText}
      if(j == 1){TieOdd = GameOddText}
      if(j == 2){SecondOdd = GameOddText}
    }
    games.push({ game: TeamsOnGameText, FirstTeam: FirstOdd, Tie: TieOdd, SecondTeam: SecondOdd });
  }

  console.log(games)

  await browser.close();
}
