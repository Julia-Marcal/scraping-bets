import { bestLeagues } from './ScrappingScripts/Leagues'
import { enterAccount } from './ScrappingScripts/enterAccount'
import { bestGames } from './ScrappingScripts/AllGames'

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

async function run() {
  await enterAccount()
  await Promise.all([
    await bestLeagues(allowed_leagues),
    await bestGames(allowed_leagues)
  ])
}
run()
