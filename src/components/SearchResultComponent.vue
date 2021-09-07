<template>
  <div class="card m-3 p-3">
    <div class="card-body">
      <h5 class="card-title">
        <a :href="searchResult.url" target="_blank">{{ searchResult.title }}</a>
      </h5>
      <p class="card-text">{{ searchResult.abstract }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, toRefs } from "vue";
import { SearchResult } from "@/types";

export default defineComponent({
  name: "SearchResultComponent",
  props: {
    searchResult: {
      type: Object as PropType<SearchResult>,
      required: true,
    },
  },
  setup(props) {
    return {
      ...toRefs(props),
    };
  },
});
</script>

<style scoped></style>
