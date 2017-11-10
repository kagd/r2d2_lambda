const axios = require('axios');
const basePath = 'https://us.api.battle.net';

function formatProfile(data) {
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

function errorHandler(callback, error) {
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

function successHandler(callback, response) {
  const profile = formatProfile(response.data)
  callback(null, profile);
}

exports.handler = function(event, context, callback) {
  const path = `${basePath}/d3/profile/${process.env.BNET_TAG}/`;

  axios({
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