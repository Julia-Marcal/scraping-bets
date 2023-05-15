import { browser } from './enterAccount';

export async function ScrapingAllowedGames(allowed_games:  string[]) {
  const GamePageTarget = await browser.waitForTarget(target => target.url().includes('sofascore.com'));
  const GamePage = await GamePageTarget.page();

  await GamePage.goto('https://www.sofascore.com/liverpool-leicester-city/GU');
  const GameOdd = await GamePage.$('div.sc-hLBbgP.sc-eDvSVe.gjJmZQ.fRddxb');
  const GameOddText = await GamePage.evaluate(el => el.innerText, GameOdd);
  console.log(GameOddText);

  await browser.close();

  // sc-bqWxrE.ihMDZk odd vitoria de cada time
  //sc-hLBbgP sc-eDvSVe cqnLf ilXvf informações de team streaks
}
