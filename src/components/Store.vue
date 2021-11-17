<template>
  <div>
    <router-link to="/basket">Корзина</router-link>
    <div class="store">
      <div v-for="item in productsList" v-bind:key="item.id">
        <div class="store-element">
          <div class="store-element-info">
            {{ item.name }}
            <div>Цена: {{ item.cost }}</div>
            <button class="store-element-add" v-on:click="addToBasket(item)">
              В корзину
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Store",
  computed: {
    productsList() {
      return this.$store.state.initialProducts;
    },
  },
  methods: {
    addToBasket: function (item) {
      this.$store.commit("addToBasket", item);
    },
  },
};
</script>
<style scoped>
.store {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 12px;
  margin-top: 12px;
}
.store-element-info {
  display: grid;
  grid-auto-columns: 1fr 1fr;
  grid-gap: 6px;
}
.store-element-add {
  grid-row: 1/3;
  grid-column: 2/3;
}
</style>
