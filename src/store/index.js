import { createStore } from 'vuex'

export default createStore({
  state: {
    breadcrumbItems: [],
  },
  getters: {
    getBreadcrumbItems: state => state.breadcrumbItems,
  },
  mutations: {
    setBreadcrumbItems(state, items) {
      state.breadcrumbItems = items;
    },
  },
  actions: {
    updateBreadcrumb({ commit }, items) {
      commit('setBreadcrumbItems', items);
    },
  },
  modules: {
  }
})
