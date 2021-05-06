<template>
  <b-container>
    <Navigation />
    <Breadcrumb :key="$route.fullPath"/>
    <b-row>
      <b-col cols="2">
        <LeftMenu />
      </b-col>
      <b-col cols="10">
        <router-view :key="$route.fullPath" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import LeftMenu from "./components/LeftMenu";
import Navigation from "./components/Navigation";
import Breadcrumb from "./components/Breadcrumb";

export default {
  name: "App",
  components: {
    LeftMenu,
    Navigation,
    Breadcrumb
  },
};
</script>
    LeftMenu

<style>
</style>
