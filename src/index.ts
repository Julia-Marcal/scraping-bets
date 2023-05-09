const pup = require('puppeteer')

const sofascore_home = "https://www.sofascore.com/football/2023-05-13";

const allowed_leagues: string[] = [
  'Brasileiro Série A',
  'Premier League',
  'LaLiga',
  'Serie A',
  'Bundesliga',
  'Ligue 1',
  'Primeira Liga',
  'Eredivisie',
  'UEFA Champions League'
]

async function best_games() {
  const browser = await pup.launch({headless: false})
  const page = await browser.newPage()

  await page.goto(sofascore_home)

  await page.waitForSelector('div.sc-bqWxrE.eljiF')
  const leagues = await page.$$('div.sc-bqWxrE.eljiF');

  const innerTexts = await Promise.all(
    leagues.map(async (league) => {
      const innerText = await page.evaluate(el => el.innerText, league);
      if(allowed_leagues.indexOf(innerText) !== -1){
        return innerText;
      }
    })
  );

  await browser.close()

  return innerTexts
}
best_games()
