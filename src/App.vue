<template>
  <div class="container-fluid">
    <NavigationBar></NavigationBar>
  </div>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavigationBar from "@/components/NavigationBar.vue";

export default defineComponent({
  name: "App",
  components: {
    NavigationBar,
  },
});
</script>

<style>
#app {
  font-family: "Helvetica Neue", serif;
  font-weight: 300;
  font-size: 0.99rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
