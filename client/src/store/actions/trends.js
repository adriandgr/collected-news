/*
 *  Trends' Actions
 */

import axios from 'axios'
import FetchStatus from '../constants/fetch-status'
import Hosts from '../constants/hosts'

export const retrieveTrends = ({ commit, state}, keywords) => {
  axios.get(`${Hosts.ACTIVE}/api/keywords/trends`)
    .then(trends => {
      if (trends.data.success) {
        console.log(trends);
        commit('setTrends', trends.data.keywords);
      } else {
        throw 'Google Trends API failed';
      }
    })
    .catch(err => {
      console.error(err);
    });
};

export const setTopKeywords = ({ commit, state }) => {
    axios.get(`${Hosts.ACTIVE}/api/keywords/top`)
    .then(res => {
      commit('setTopKeywords', res.data);
    })
    .catch(err => {
      console.error(err);
    });
}
