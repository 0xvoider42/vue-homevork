<template>
  <div>
    <h2>Orders</h2>
    <table class="table" v-if="orders && orders.length">
      <thead>
        <tr>
          <th scope="col">Order ID</th>
          <th scope="col">Items</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(order, index) in orders" :key="order.id + '-' + index">
          <td>#{{ order.id }}</td>
          <td>{{ order.items.length }} items(s)</td>
          <td><b-button variant="outline-primary" :to="'orders/' + order.id">View order</b-button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "OrdersPage",
  components: {

  },
  mounted() {
  axios
    .get("https://euas.person.ee/user/orders")
    .then(response => {
      this.orders = response.data;
    });
  },
   data: function () {
    return {
      orders: [],
    };
  },
};
</script>

<style>
</style>