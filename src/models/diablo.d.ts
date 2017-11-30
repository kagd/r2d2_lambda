interface IBaseTimePlayed {
  barbarian: number;
  crusader: number;
  monk: number;
  necromancer: number;
  wizard: number;
}

interface IBaseProfile {
  kills: {
    hardcoreMonsters: number;
    monsters: number;
    elites: number;
  };
  paragonLevel: number;
}

export interface IProfile extends IBaseProfile {
  lastHeroPlayedId: number;
  lastPlayedAt: number;
  timePlayed: IBaseTimePlayed & {
    demonHunter: number;
    witchDoctor: number;
  };
}

export interface IResponseProfile extends IBaseProfile {
  lastHeroPlayed: number;
  lastUpdated: number;
  timePlayed: IBaseTimePlayed & {
    'demon-hunter': number;
    'witch-doctor': number;
  };
}
