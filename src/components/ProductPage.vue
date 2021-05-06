<template>
  <div>
    <h2>{{ product.title }}</h2>
    <b-row>
      <b-col cols="5">
        <img :src="selectedOption.image" />
      </b-col>
      <b-col cols="7">
        <p>{{ product.description }}</p>
        <p>
          <b-button-group>
            <b-button
              v-for="option in product.options"
              :pressed="option.code == selectedOption.code"
              :key="option.code"
              @click="selectOption(option)"
              >{{ option.title }}</b-button
            >
          </b-button-group>
        </p>
        <p>
          Number of items:
          <b-alert variant="warning" :show="numberOfItems > selectedOption.qty"
            >The number of items you selected ({{ numberOfItems }}) is greater
            than we have in stock ({{ selectedOption.qty }})</b-alert
          >
          <b-input-group class="mt-3 number-of-items">
            <b-input-group-prepend>
              <b-button @click="removeItem">-</b-button>
            </b-input-group-prepend>
            <b-form-input
              v-model="numberOfItems"
              :number="true"
              type="number"
            ></b-form-input>
            <b-input-group-append>
              <b-button @click="addItem">+</b-button>
            </b-input-group-append>
          </b-input-group>
        </p>
        <p>
          Price:
          <Price
            :price="selectedOption.price * this.numberOfItems"
            :priceDiscounted="selectedOption.priceDiscounted * this.numberOfItems"
            :discountPercentage="selectedOption.discountPercentage"
          />
        </p>
        <p>
          <b-button size="lg" variant="info" @click="addToCart" class="mr-2">Add to cart</b-button>
          <b-button size="lg" variant="success" @click="buyNow">Buy now!</b-button>
        </p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import axios from "axios";
import Price from "./Price";

export default {
  name: "ProductPage",
  components: {
    Price,
  },
  mounted() {
    axios
      .get("https://euas.person.ee/products/" + this.$route.params.productId)
      .then(response => {
        this.product = response.data;
        this.selectedOption = response.data.options[0];
      });
  },
  data: function () {
    return {
      product: {},
      selectedOption: {},
      numberOfItems: 1,
    };
  },
  methods: {
    selectOption: function (option) {
      this.selectedOption = option;
    },
    removeItem: function () {
      if (this.numberOfItems > 1) {
        this.numberOfItems--;
      }
    },
    addItem: function () {
      this.numberOfItems++;
    },
    addToCart: function (event, callback) {
      this.$root.$options.cart.items.push({
          productId: this.product.id,
          qty: this.numberOfItems,
          optionCode: this.selectedOption.code,
          optionImage: this.selectedOption.image,
          price: this.selectedOption.price,
          total: this.selectedOption.price * this.numberOfItems
        }
      )
      axios
      .put("https://euas.person.ee/user/carts/" + this.$root.$options.cart.id,
      this.$root.$options.cart)
      .then(response => {
        if(callback) {
          callback(event, response)
        }
      });
    },
    buyNow: function (event) {
      let router = this.$router
      this.addToCart(event, function() {
        router.push('/cart')
      });
    }
  },
};
</script>

<style>
.number-of-items {
  width: 200px;
}
</style>