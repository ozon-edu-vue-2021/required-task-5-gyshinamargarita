import Vue from "vue";
import Vuex from "vuex";
import api from "@/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: { initialProducts: [], basketElements: [] },
  mutations: {
    setProducts(state, payload) {
      state.initialProducts = payload.map((item, idx) => {
        return {
          cost: idx + 1,
          name: item.ingredient,
          id: item.id,
          count: 1,
        };
      });
    },
    addToBasket(state, payload) {
      state.basketElements = [...state.basketElements, payload];
    },
    removeElementFromBasket(state, payload) {
      state.basketElements = state.basketElements.filter(
        (item) => item.id !== payload.id
      );
    },
  },
  actions: {
    getProducts(context) {
      api.getProducts().then((res) => {
        context.commit("setProducts", res.data);
      });
    },
  },
  getters: {
    basketUniqElements(state) {
      return state.basketElements.reduce((uniq, current) => {
        const nonUniqIdx = uniq.findIndex((item) => item.id === current.id);
        if (nonUniqIdx >= 0) {
          const newUniq = {
            ...uniq[nonUniqIdx],
            count: uniq[nonUniqIdx].count + 1,
            cost:
              uniq[nonUniqIdx].cost +
              state.initialProducts.find((el) => el.id === current.id).cost,
          };
          return [
            ...uniq.slice(0, nonUniqIdx),
            ...uniq.slice(nonUniqIdx + 1),
            newUniq,
          ];
        }
        return [...uniq, current];
      }, []);
    },
    getTotal(state, getters) {
      return getters.basketUniqElements.reduce(
        (init, curr) => init + curr.cost,
        0
      );
    },
  },
});
