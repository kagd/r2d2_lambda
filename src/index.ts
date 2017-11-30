import { Handler } from 'aws-lambda';
import { fetchProfile as fetchD3Profile } from './diablo/profile';

const handler: Handler = function(event, context, callback) {
  fetchD3Profile(callback);
};

exports.handler = handler;
