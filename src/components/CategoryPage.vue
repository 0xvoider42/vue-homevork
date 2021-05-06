<template>
  <div>
    <h2>Category page for {{ $route.params.alias }}</h2>
    <ProductSection :category="$route.params.alias" :showFilters="true"/>
  </div>
</template>

<script>
import ProductSection from "./ProductSection";

export default {
  name: "CategoryPage",
  components: {
    ProductSection,
  },
  data: function () {
    return {};
  },
};
</script>

<style>
.product-item {
  margin-right: 0 !important;
}
</style>