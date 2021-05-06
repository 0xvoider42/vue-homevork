<template>
  <div>
    <span class="regular-price" v-if="price == effectivePrice">{{ price.toFixed(2) }}$</span>
    <span class="original-price" v-if="price != effectivePrice">{{ price.toFixed(2) }}$</span>&nbsp;
    <span class="discounted-price" v-if="price != effectivePrice">{{ effectivePrice.toFixed(2) }}$</span>
  </div>
</template>

<script>
export default {
  name: "Price",
  components: {

  },

  props: {
    price: Number,
    priceDiscounted: {
      type: Number,
      required: false 
      },
    discountPercentage: {
      type: Number,
      required: false 
      },
  },
  computed: {
    effectivePrice: function () {
       if (!isNaN(this.priceDiscounted)) {
        return this.priceDiscounted;
      } else if (this.discountPercentage !== undefined) {
        return this.price - this.price * this.discountPercentage;
      } else {
        return this.price;
      }
    }
  }
};
</script>

<style>
.regular-price {
  font-weight: bold;
  color: black;
}
.original-price {
  font-weight: bold;
  color: green;
  text-decoration: line-through;
}
.discounted-price {
  font-weight: bold;
  color: red;
}
</style>
