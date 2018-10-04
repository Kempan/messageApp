import config from '../config';
import { AsyncStorage } from 'react-native';

const queryString = require('query-string');

export default {
  fetchMessages: (endpoint, additionalQuaryParams) => {

    let params = {};

    Object.keys(additionalQuaryParams).forEach((key, i) => {
      params[key] = additionalQuaryParams[key];
    });

    return AsyncStorage.getItem(config.userIdKey)
      .then(key => {

        //<----TAR FRAM ALLA MEDDELANDEN FRÅN DATABASEN----->
        params.toUser = key;
        let query = queryString.stringify(params);
        console.log(query)
        return fetch(`${config.baseUrl}api/${endpoint}?${query}`, {
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

  createMessages: (additionalParams) => {

    let params = {};

    Object.keys(additionalParams).forEach((key, i) => {
      params[key] = additionalParams[key];
    });

    return AsyncStorage.getItem(config.userIdKey)
      .then(key => {
        params.fromUser = key;
        let query = queryString.stringify(params);
        console.log(query)
        return fetch(`${config.baseUrl}api/message`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json'
          },
          body: JSON.stringify(params)
        })
          .then(response => {
            return response.json();
          })
      });
  },

  sortedMessages: (arrayOfMessages) => {
    arrayOfMessages.sort((a, b) => { return new Date(a.timestamp) - new Date(b.timestamp) });
    return arrayOfMessages;
  }
};