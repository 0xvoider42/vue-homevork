<template>
  <div>
    <b-carousel
      id="carousel"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      class="mb-20"
      style="text-shadow: 1px 1px 2px #333;"
    >
    <router-link :to="'/products/' + product.id" v-for="product in products" :key="product.id">

      <b-carousel-slide
        :caption="product.title"
        :text="product.description"
        :img-src="product.image"
      ></b-carousel-slide>
    </router-link>
    </b-carousel>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ProductCarousel",
  components: {},
   mounted() {
       axios
        .get("https://euas.person.ee/products/")
        .then(response => {
         this.products = response.data;
      });
  },
  data: function () {
    return {
      products: [],
    };
  },
};
</script>

<style>
#carousel {
  margin-bottom: 20px;
}
</style>