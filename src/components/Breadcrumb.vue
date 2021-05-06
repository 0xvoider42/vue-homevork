<template>
  <div>
    <b-breadcrumb :items="items"></b-breadcrumb>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Breadcrumb',
  mounted() {
    let requests= []
    if(this.$route.name == 'category' || this.$route.name == 'product') {
      requests.push(axios.get("https://euas.person.ee/categories"))
    }

    if(this.$route.name == 'product') {
      requests.push(axios.get("https://euas.person.ee/products/" + this.$route.params.productId))
    }

  axios.all(requests).then(axios.spread((...responses) => {
    if(responses.length > 0) {
    const categoriesResponse = responses[0]
    const productResponse = responses[1]

    let categoryAlias = this.$route.params.alias
    if(responses.length > 1) {
      this.product = productResponse.data
      categoryAlias = this.product.categories[0]
     }
      this.category = categoriesResponse.data.filter(c => c.alias == categoryAlias)[0]
    } 
      this.create()
    }))
},
  methods: {
    create: function () {
      this.items.push({ text: 'Home', to: '/' })
      
    if(this.$route.name == 'product' || this.$route.name == 'category') {
        let category = this.category
        this.items.push({ text: category.title, to: '/categories/' + category.alias})
      

      if(this.$route.name == 'product') {
        this.items.push({ text: this.product.title, to: '/products/' + this.product.id})
      }
      }else if(this.$route.name == 'orderDetails' || this.$route.name == 'orders'){
        this.items.push({ text: 'Orders', to: '/orders' })
        if(this.$route.name == 'orderDetails'){
          this.items.push({ text: 'Order #' + this.$route.params.orderId, to: '/orders/' + this.$route.params.orderId})
        }

    } else if(this.$route.name != 'home'){
        this.items.push({ text: this.$route.name.charAt(0).toUpperCase() + this.$route.name.slice(1), to: this.$route.fullPath})
      }
    }
  },
  data: function () {
    return {
      items: [],
      product: {},
      category: {}
    };
  },
};
</script>

<style>
</style>
