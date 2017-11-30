import {
  IProfile,
  IResponseProfile,
} from '../models/diablo';
import AxiosService from '../axios-service';
import { Callback } from 'aws-lambda';
import {
  AxiosError,
  AxiosResponse,
} from 'axios';
import { errorHandler } from '../lambda';
import { getApp, getDatabase } from '../firebaseService';

function successHandler(callback: Callback, response: AxiosResponse) {
  console.log('success');
  const profile = formatProfileFromResponse(response.data);
  console.log('calling firebase set');
  getDatabase().ref('/d3/profile').set(profile)
    .then(function() {
      console.log('firebase set done');
      getApp().delete().then(function() {
        console.log('firebase app deleted');
        callback(null, {result: 'success'});
      });
    })
    .catch((error: AxiosError) => errorHandler(callback, error));
}

function formatProfileFromResponse(data: IResponseProfile): IProfile {
  const profile = {
    kills: {
      elites: data.kills.elites,
      hardcoreMonsters: data.kills.hardcoreMonsters,
      monsters: data.kills.monsters,
    },
    lastHeroPlayedId: data.lastHeroPlayed,
    lastPlayedAt: data.lastUpdated,
    paragonLevel: data.paragonLevel,
    timePlayed: {
      barbarian: data.timePlayed.barbarian,
      crusader: data.timePlayed.crusader,
      demonHunter: data.timePlayed['demon-hunter'],
      monk: data.timePlayed.monk,
      necromancer: data.timePlayed.necromancer,
      witchDoctor: data.timePlayed['witch-doctor'],
      wizard: data.timePlayed.wizard,
    },
  };

  return profile;
}

export function fetchProfile(callback: Callback) {
  AxiosService.diablo.fetchProfile()
    .then((response) => successHandler(callback, response) )
    .catch((response) => errorHandler(callback, response));
}
