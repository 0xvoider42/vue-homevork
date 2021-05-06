<template>
  <div class="section">
    <h3>{{ title }}</h3>
    <b-form inline v-if="showFilters" class="mb-2">
    <b-form-input
      id="inline-form-input-name"
      class="mb-2 mr-sm-2 mb-sm-0"
      placeholder="Price from"
      v-model="priceFrom"
    ></b-form-input>
    -
    <b-input-group class="mb-2 mr-sm-2 mb-sm-0">
      <b-form-input  placeholder="Price to" v-model="priceTo"></b-form-input>
    </b-input-group>
  </b-form>
    <b-card-group deck>
      <ProductItem
       :product="product"
       v-for="product in filteredProducts" 
       :key="product.id" />
    </b-card-group>
  </div>
</template>

<script>
import axios from "axios";
import ProductItem from "./ProductItem";

export default {
  name: "ProductSection",
  components: {
    ProductItem,
  },
  props: {
    title: String,
    category: String,
    section: String,
    showFilters: Boolean,
  },
  mounted() {
    if (this.section) {
       axios
        .get("https://euas.person.ee/sections/" + this.section + "/products")
        .then(response => {
         this.products = response.data;
      });
    }else if(this.category){
       axios
        .get("https://euas.person.ee/categories/" + this.category + "/products")
        .then(response => {
         this.products = response.data;
      });
    } else {
      axios
        .get("https://euas.person.ee/products")
        .then(response => {
         this.products = response.data.slice(0, 3);
      });
    }

    let that = this
    let loadMoreItems = 3
    window.addEventListener("scroll", function() {
      let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight === document.documentElement.offsetHeight;
      if(bottomOfWindow){
        axios
        .get("https://euas.person.ee/products")
        .then((response) => {
         that.products = that.products.concat(response.data.slice(that.products.length, that.products.length + loadMoreItems));
      });
      }
    })

  },
  computed: {
    filteredProducts: function() {
      let that = this
      let result = this.products
      if(this.priceFrom){
        result = this.products.filter(function(product){ return that.filterPrice(product) >= that.priceFrom})
      }
      if(this.priceTo){
        result = this.products.filter(function(product){ return that.filterPrice(product) <= that.priceTo})
      }
     return result
    }
  },
   methods: {
    filterPrice: function (product) {
      return this.effectivePrice(this.cheapestOption(product));
    },
    effectivePrice: function (option) {
      if (option.priceDiscounted !== undefined) {
        return option.priceDiscounted;
      } else if (option.discountedPercentage !== undefined) {
        return option.price - option.price * option.discountedPercentage;
      } else {
        return option.price;
      }
    },
    cheapestOption: function (product) {
      let cheapest = product.options[0];
      for (const option of product.options) {
        if (this.effectivePrice(option) < this.effectivePrice(cheapest)) {
          cheapest = option;
        }
      }
      return cheapest;
    },
  },
  data: function () {
    return {
      products: [],
      priceFrom: null,
      priceTo: null
    };
  },
};
</script>

<style>
.section {
  margin-bottom: 10px;
}
</style>