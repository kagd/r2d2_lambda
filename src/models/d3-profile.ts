export default interface D3Profile {
  kills: {
    hardcoreMonsters: number;
    monsters: number;
    elites: number;
  }
  lastHeroPlayed: number;
  lastUpdated: number;
  paragonLevel: number;
  timePlayed: {
    barbarian: number;
    crusader: number;
    'demon-hunter': number;
    monk: number;
    necromancer: number;
    'witch-doctor': number;
    wizard: number;
  }
}
