<template>
  <div>
    <h2>All products</h2>
    <ProductSection :showFilters="true"/>
  </div>
</template>

<script>
import ProductSection from "./ProductSection";

export default {
  name: "ProductsPage",
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