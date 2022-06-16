import {parseLocalStorage, setLocalStorage} from '@/utility/localStorage-utility'
import {FILTER_DEFAULT} from '@/settings'

export default {
  namespaced: true,
  mutations: {
    filterChange(state, newParams) {
      setLocalStorage('filter', JSON.stringify(newParams))
    }
  },
  actions: {
    filterChange({commit}, newParams) {

      commit('filterChange', newParams)
    },
    filterFetch(_) {
      return parseLocalStorage('filter') || FILTER_DEFAULT;
    }
  }
}