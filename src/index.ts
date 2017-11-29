
import D3Profile from './models/d3-profile';
import axios, {
  AxiosError,
  AxiosResponse,
} from 'axios';
import * as admin from 'firebase-admin';
import { Callback, Handler } from 'aws-lambda';

const baseURL = 'https://us.api.battle.net';
const instance = axios.create({
  baseURL,
});
const serviceAccount = require("./serviceAccountKey.json");

const config = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://activerecord-firebase.firebaseio.com",
};
const firebaseApp = admin.initializeApp(config);
const firebaseDatabase = firebaseApp.database();

function formatProfile(data: D3Profile) {
  const profile = {
    lastHeroPlayedId: data.lastHeroPlayed,
    kills: {
      hardcoreMonsters: data.kills.hardcoreMonsters,
      monsters: data.kills.monsters,
      elites: data.kills.elites,
    },
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
    lastPlayedAt: data.lastUpdated
  }

  return profile;
}

function errorHandler(callback: Callback, error: AxiosError) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log('error.response.data', error.response.data);
    console.log('error.response.status', error.response.status);
    console.log('error.response.headers', error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log('error.request', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log('Error', error.message);
  }
  console.log('error.config', error.config);
  callback(error);
}

function successHandler(callback: Callback, response: AxiosResponse) {
  console.log('success');
  const profile = formatProfile(response.data);
  console.log('calling firebase set');
  firebaseDatabase.ref('/d3/profile').set(profile)
  .then(function(){
    console.log('firebase set done');
    firebaseApp.delete().then(function(){
      console.log('firebase app deleted');
      callback(null, {result: 'success'});
    });
  })
  .catch(errorHandler.bind(null, callback));
}

exports.handler = <Handler>function(event, context, callback) {
  const path = `/d3/profile/${process.env.BNET_TAG}/`;
  console.log('path', path);

  instance.request({
    method: 'get',
    url: path,
    params: {
      locale: 'en_US',
      apikey: process.env.BNET_KEY
    },
  })
  .then(successHandler.bind(null, callback))
  .catch(errorHandler.bind(null, callback));
}