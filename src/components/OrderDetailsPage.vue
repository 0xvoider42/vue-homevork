<template>
  <div>
    <div>
    <h2>Order details #{{ this.$route.params.orderId}}</h2>
    <table class="table" v-if="cart.items && products.length">
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Option</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Amount</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in cart.items"
          :key="item.productId + '-' + item.optionCode + '-' + index">
          <td>
            <b-link :to="'/products/' + item.productId">
            <img :src="getOptionByCode(item.productId, item.optionCode).image" class="cart-image">
            {{ getProductById(item.productId).title}}</b-link></td>
          <td>{{ getOptionByCode(item.productId, item.optionCode).title }}</td>
          <td>{{ item.price }}$</td>
          <td>
            {{ item.qty}}
          </td>
          <td>{{ item.total.toFixed(2) }}</td>
        </tr>
      </tbody>
      <tr>
          <td colspan="4">TOTAL</td>
          <td>{{ totalPrice.toFixed(2) }}$</td>
        </tr>
    </table>
  </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OrderDetailsPage",
  components: {},
  computed: {
    totalPrice: function() {
      let total = 0
      for(const product of this.cart.items){
        total += product.total
      }
      return total
    }
  },
  mounted() {
    axios
      .get("https://euas.person.ee/user/carts/" + this.$route.params.orderId)
      .then(response => {
        this.cart = response.data;
      });
    axios.get("https://euas.person.ee/products")
    .then(response => {
      this.products = response.data;
    });
  },
  methods: {
    getProductById: function(productId) {
      return this.products.filter((product) => { return product.id == productId })[0]
    },
    getOptionByCode: function(productId, optionCode) {
      return this.getProductById(productId).options.filter((option) => { return option.code == optionCode })[0]
    },

  },
  data: function () {
    return {
      products: [],
      cart: {},
    };
  },
};
</script>

<style>
.cart-image {
  max-width: 100px;
  max-height: 100px;
}
</style>