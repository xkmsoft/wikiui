<template>
  <div class="container">
    <div class="d-flex m-2 p-2 justify-content-center">
      <div class="">
        <label for="search-box"></label>
        <input
          id="search-box"
          ref="searchInput"
          type="search"
          class="form-control search-input m-1 p-1"
          placeholder="Search..."
          @change="onChange"
          @click="onClick"
        />
      </div>
    </div>
    <div class="d-flex m-2 p-2 justify-content-center">
      <div v-if="searchResults">
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
      <div v-if="error" class="text-danger">
        {{ error }}
      </div>
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
  min-width: 40vw;
  min-height: 50px;
  margin-top: 100px !important;
}
</style>
