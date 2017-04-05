/*
 *  Trends' Actions
 */

import axios from 'axios'
import FetchStatus from '../constants/fetch-status'
import Hosts from '../constants/hosts'

export const retrieveTrends = ({ commit, state}, keywords) => {
  axios.get(`${Hosts.ACTIVE}/api/keywords/trends`)
    .then(trends => {
      if (trends.success) {
        commit('setTrends', trends);
      } else {
        throw 'Google Trends API failed';
      }
    })
    .catch(err => {
      console.error(err);
    });
};

export const setTopKeywords = ({ commit, state }) => {
  new Promise((resolve, reject) => {
    state.keywords.status = FetchStatus.LOADING;
    axios.get(`${Hosts.ACTIVE}/api/keywords/top`)
      .then(res => {
        state.keywords.status = FetchStatus.COMPLETE;
        resolve(commit('setTopKeywords', res.data));
      })
      .catch(err => {
        reject(err);
      });
  })
}
