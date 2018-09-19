import config from '../config';

export default {
  fetchMessages: (additionalQuaryParams) => {

    AsyncStorage.getItem(config.userIdKey)
      .then(key => {
        let query = `?toUser=${key}`;
        return fetch(`${config.baseUrl}api/message${query}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'content-type': 'application/json'
          }
        })
          .then(response => {
            return response.json();
          })
          .then(responseJson => {
            this.setState({
              messages: responseJson.data,
              showActivityIndicator: false
            })
          })
          .catch(err => {
            console.log(err.message);
            this.setState({
              showActivityIndicator: false
            })
          })
      })
  },
}