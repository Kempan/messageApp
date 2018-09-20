import config from '../config';
import { AsyncStorage } from 'react-native';

const queryString = require('query-string');

export default {
  fetchMessages: additionalQuaryParams => {

    let params = {};

    Object.keys(additionalQuaryParams).forEach((key, i) => {
      params[key] = additionalQuaryParams[key];
    });

    return AsyncStorage.getItem(config.userIdKey)
      .then(key => {
        params.toUser = key;
        let query = queryString.stringify(params);
        console.log(query);
        return fetch(`${config.baseUrl}api/message?${query}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json'
          }
        })
          .then(response => {
            return response.json();
          })
      });
  },
};