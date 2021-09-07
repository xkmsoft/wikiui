<template>
  <div class="container">
    <div class="d-flex m-3 p-3 justify-content-center">
      <input
        id="search-box"
        ref="searchInput"
        type="search"
        class="form-control search-input m-3 p-3"
        placeholder="Search..."
        @change="onChange"
        @click="onClick"
      />
    </div>
    <div
      v-if="searchResults"
      class="d-flex flex-column m-2 p-2 justify-content-center"
    >
      <span class="text-muted m-3 p-3"
        >{{ searchResults.number_of_results }} results returned in
        {{ searchResults.processed.time }}
        {{ searchResults.processed.unit }}</span
      >
      <SearchResultComponent
        v-for="searchResult in searchResults.results"
        :key="searchResult.url"
        :search-result="searchResult"
      >
      </SearchResultComponent>
    </div>

    <div v-if="error" class="d-flex m-2 p-2 justify-content-center text-danger">
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, nextTick } from "vue";
import { useStore } from "@/store";
import { SearchResults } from "@/types";
import { ActionTypes } from "@/store/actions";
import SearchResultComponent from "@/components/SearchResultComponent.vue";

export default defineComponent({
  name: "Home",
  components: { SearchResultComponent },
  setup() {
    const store = useStore();
    const searchInput = ref<null | HTMLInputElement>(null);
    const searchResults = ref<null | SearchResults>(null);
    const error = ref<null | string>(null);

    const onChange = async () => {
      if (searchInput.value) {
        const query = searchInput.value.value;
        if (query === "") {
          searchResults.value = null;
          error.value = null;
        } else {
          try {
            searchResults.value = await store.dispatch(
              ActionTypes.MakeQuery,
              query
            );
            error.value = null;
          } catch (e) {
            error.value = e;
          }
        }
      }
    };

    const onClick = () => {
      nextTick().then(() => {
        setTimeout(() => {
          if (searchInput.value) {
            if (searchInput.value.value === "") {
              searchResults.value = null;
              error.value = null;
            }
          }
        }, 50);
      });
    };

    return {
      searchInput,
      searchResults,
      error,
      onChange,
      onClick,
    };
  },
});
</script>

<style scoped>
.search-input {
  min-height: 50px;
  border-radius: 15px;
}
</style>
