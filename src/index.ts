import { bestLeagues } from './ScrapingScripts/Sofascore/Leagues'
import { enterAccount } from './ScrapingScripts/Sofascore/enterAccount'
import { bestGames } from './ScrapingScripts/Sofascore/AllGames'
import { ScrapingAllowedGames } from './ScrapingScripts/Sofascore/AllowedGames'

const allowed_leagues: string[] = [
  'Brasileiro Série A',
  'Premier League',
  'LaLiga',
  'Serie A',
  'Bundesliga',
  'Ligue 1',
  'Primeira Liga',
  'Eredivisie',
  'UEFA Champions League',
  'UEFA Europa League',
  'UEFA Europa Conference League'
]

const sofascore_home = "https://www.sofascore.com/";

let allowed_games;
let scraped_games;

async function scrapingBestGames() {
  await enterAccount()

  await Promise.all([
    await bestLeagues(allowed_leagues, sofascore_home),
    allowed_games = await bestGames(allowed_leagues),
    scraped_games = await ScrapingAllowedGames(allowed_games),
  ])
}
scrapingBestGames()
