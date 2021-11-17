<template>
  <div>
    <router-link to="/">Магазин</router-link>
    <div class="basket">
      <template v-if="basketList.length">
        <div class="basket-titles">
          <div>Предмет</div>
          <div>Количество</div>
          <div>Цена</div>
        </div>
        <div v-for="item in basketList" v-bind:key="item.id">
          <div class="basket-element">
            <div>{{ item.name }}</div>
            <div>{{ item.count }}</div>
            <div>{{ item.cost }}</div>
            <button class="remove" v-on:click="remove(item)">Удалить</button>
          </div>
        </div>
        <div class="basket-total">
          Общая сумма: <span>{{ totalValue }}</span>
        </div>
        <button class="basket-checkout" v-on:click="checkout">
          Перейти к оформлению
        </button>
      </template>
      <template v-else> <div>Корзина пуста</div></template>
    </div>
  </div>
</template>

<script>
export default {
  name: "Basket",
  computed: {
    basketList() {
      return this.$store.getters.basketUniqElements;
    },
    totalValue() {
      return this.$store.getters.getTotal;
    },
  },

  methods: {
    checkout: function () {
      alert(
        `${this.basketList
          .map(
            (item) =>
              `${item.name}, в количестве: ${item.count} шт., стоимостью: ${item.cost}`
          )
          .join("\n")}` +
          "\n \n" +
          `Итого: ${this.totalValue}`
      );
    },
    remove: function (item) {
      this.$store.commit("removeElementFromBasket", item);
    },
  },
};
</script>
<style scoped>
.basket {
  margin-top: 12px;
}
.basket-titles {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 150px;
  margin-bottom: 12px;
}
.basket-element {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 150px;
}
.basket-checkout {
  margin-top: 6px;
}
.basket-total {
  margin-top: 6px;
}
.basket-element > * {
  align-self: center;
}
</style>
