<template>
  <div>
    <ProductCarousel />
    <ProductSection title="Top Selling" section="topselling" />
    <ProductSection title="Buy now!" section="buynow" />
    <ProductSection title="Recommended" section="recommended" />
  </div>
</template>

<script>
import ProductSection from "./ProductSection";
import ProductCarousel from "./ProductCarousel";

export default {
  name: "MainPage",
  components: {
    ProductSection,
    ProductCarousel
  },
  data: function () {
    return {

    }
  },
}
</script>

<style>
</style>
