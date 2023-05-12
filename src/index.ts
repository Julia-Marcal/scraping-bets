import { bestLeagues } from './ScrapingScripts/Leagues'
import { enterAccount } from './ScrapingScripts/enterAccount'
import { bestGames } from './ScrapingScripts/AllGames'
import { ScrapingAllowedGames } from './ScrapingScripts/AllowedGames'

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

let allowed_games = [];

async function run() {
  await enterAccount()
  await Promise.all([
    await bestLeagues(allowed_leagues),
    allowed_games = await bestGames(allowed_leagues),
    await ScrapingAllowedGames(allowed_games)
  ])
}
run()
