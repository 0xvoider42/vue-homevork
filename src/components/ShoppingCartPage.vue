<template>
  <div>
    <div>
    <h2>Shopping Cart</h2>
    <table class="table" v-if="cart.items && products.length">
      <thead>
        <tr>
          <th scope="col">Product</th>
          <th scope="col">Option</th>
          <th scope="col">Price</th>
          <th scope="col">Quantity</th>
          <th scope="col">Amount</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in cart.items"
          :key="item.productId + '-' + item.optionCode + '-' + index">
          <td>
            <img :src="getOptionByCode(item.productId, item.optionCode).image" class="cart-image">
            {{ getProductById(item.productId).title}}</td>
          <td>{{ getOptionByCode(item.productId, item.optionCode).title }}</td>
          <td>{{ item.price }}$</td>
          <td>
            <b-input-group class="mt-3 number-of-items">
            <b-input-group-prepend>
              <b-button @click="removeItem(index)">-</b-button>
            </b-input-group-prepend>
            <b-form-input v-model="cart.items[index].qty" :number="true" type="number"></b-form-input>
            <b-input-group-append>
              <b-button @click="addItem(index)">+</b-button>
            </b-input-group-append>
          </b-input-group>
          </td>
          <td>{{ item.total.toFixed(2) }}</td>
          <td><b-button variant="outline-danger" @click="deleteRow(index)">X</b-button></td>
        </tr>
      </tbody>
      <tr>
          <td colspan="4">TOTAL</td>
          <td>{{ totalPrice.toFixed(2) }}$</td>
          <td></td>
        </tr>
    </table>
    <div class="text-right" v-if="cart.items.length">
    <b-button size="lg" variant="success" @click="submitCart">Complete Purchase!</b-button>
  </div>
  </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ShoppingCartPage",
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
      .get("https://euas.person.ee/user/carts/" + this.$root.$options.cart.id)
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
    deleteRow: function(rowIndex) {
      this.cart.items.splice(rowIndex, 1)
      this.saveCart()
    },
    removeItem: function(rowIndex) {
      if(this.cart.items[rowIndex].qty == 1) {
        this.deleteRow(rowIndex)
      }else{
        this.cart.items[rowIndex].qty -= 1
        this.cart.items[rowIndex].total = this.cart.items[rowIndex].qty * this.cart.items[rowIndex].price
      }
      this.saveCart()
    },
    addItem: function(rowIndex) {
      this.cart.items[rowIndex].qty += 1
      this.cart.items[rowIndex].total = this.cart.items[rowIndex].qty * this.cart.items[rowIndex].price
      this.saveCart()
    },
    saveCart: function() {
      axios
      .put("https://euas.person.ee/user/carts/" + this.$root.$options.cart.id,
      this.cart)
      .then(response => {
        this.$root.$options.cart = response.data
      });
    },
    submitCart: function() {
      let that = this
      axios
      .post("https://euas.person.ee/user/carts/" + this.$root.$options.cart.id + "/orders",
      this.cart).then((r) => {
          axios
            .post("https://euas.person.ee/user/carts").then((response) => {
              that.$root.$options.cart = response.data
              that.cart = response.data
              localStorage.cartId = response.data.id

              this.$router.push('/orders/' + r.data.id)
            });
      });
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
.number-of-items {

}
</style>