import { bestGames } from './Leagues'
import { enterAccount} from './enterAccount'
const { connectBrowser } = require('./browser');

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
  await connectBrowser();
  await enterAccount()
  await bestGames(allowed_leagues)
}
run()
