<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light" class="mb-2">
      <b-navbar-brand to="/">e-commerce app</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item to="/products">Products</b-nav-item>
          <b-nav-item to="/cart">Cart</b-nav-item>
          <b-nav-item to="/orders">Orders</b-nav-item>
          <b-nav-item to="/help">Help</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <vue-bootstrap-typeahead
            :data="products"
            :serializer="(product) => product.title"
            @hit="selectSearchResult"
            inputClass="suggestion-input"
          >
            <template slot="suggestion" slot-scope="{ data, htmlText }">
               <img class="suggestion-img" :src="data.image"/><span v-html="htmlText"></span>
            </template>
          </vue-bootstrap-typeahead>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import axios from "axios";
import VueBootstrapTypeahead from "vue-bootstrap-typeahead";

export default {
  name: "Navigation",
  components: {
    VueBootstrapTypeahead,
  },
  mounted() {
    axios.get("https://euas.person.ee/products").then(response => {
      this.products = response.data;
    });
  },
  data: function () {
    return {
      count: 1,
      products: [],
    };
  },
  methods: {
    selectSearchResult: function (product) {
      this.$router.push("/products/" + product.id);
    },
  },
};
</script>

<style>
.suggestion-img {
  max-width: 70px;
  margin-right: 10px;
}
input.suggestion-input {
  width: 300px !important;
}
</style>