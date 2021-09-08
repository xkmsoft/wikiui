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
      v-if="searchResults && results.length"
      class="d-flex flex-column m-2 p-2 justify-content-center"
    >
      <span class="text-muted m-3 p-3"
        >{{ searchResults.number_of_results }} results returned in
        {{ searchResults.processed.time }}
        {{ searchResults.processed.unit }}</span
      >
      <SearchResultComponent
        v-for="searchResult in results"
        :key="searchResult.url"
        :search-result="searchResult"
      >
      </SearchResultComponent>
      <div
        v-show="hasNextPage"
        ref="lazyLoader"
        class="card search-card m-3 p-3"
      >
        <p class="card-text">Loading more results...</p>
      </div>
      <div v-show="!hasNextPage" class="card search-card m-3 p-3">
        <p class="card-text">End of the results</p>
      </div>
    </div>

    <div v-if="error" class="d-flex m-2 p-2 justify-content-center text-danger">
      {{ error }}
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeMount,
  onMounted,
  ref,
} from "vue";
import { useStore } from "@/store";
import { QueryPayload } from "@/types";
import { ActionTypes } from "@/store/actions";
import SearchResultComponent from "@/components/SearchResultComponent.vue";
import { MutationType } from "@/store/mutations";

export default defineComponent({
  name: "Home",
  components: { SearchResultComponent },
  setup() {
    const store = useStore();
    const searchInput = ref<null | HTMLInputElement>(null);
    const error = ref<null | string>(null);
    const observer = ref<IntersectionObserver | null>(null);
    const lazyLoader = ref<Element | null>(null);
    const searchResults = computed(() => {
      return store.getters.getCurrentSearch;
    });
    const currentPage = computed(() => {
      return store.state.currentPage;
    });
    const hasNextPage = computed(() => {
      return store.getters.hasNextPage;
    });
    const results = computed(() => {
      return store.getters.getSearchResults;
    });

    onMounted(() => {
      window.addEventListener("scroll", scrollListener);
      observer.value = new IntersectionObserver(infiniteScroll);
      observe();
    });

    onBeforeMount(() => {
      window.removeEventListener("scroll", scrollListener);
      if (observer.value) {
        observer.value.disconnect();
      }
    });

    const observe = () => {
      if (observer.value && lazyLoader.value) {
        observer.value.observe(lazyLoader.value);
      }
    };

    const scrollListener = () => {
      observe();
    };

    const infiniteScroll = async (entries: IntersectionObserverEntry[]) => {
      if (entries.length) {
        const entry: IntersectionObserverEntry = entries[0];
        if (entry.isIntersecting && searchInput.value) {
          const query = searchInput.value.value;
          try {
            const payload: QueryPayload = {
              query: query,
              page: currentPage.value + 1,
            };
            await store.dispatch(ActionTypes.MakeQuery, payload);
            observe();
            error.value = null;
          } catch (e) {
            error.value = e;
          }
        }
      }
    };

    const onChange = async () => {
      if (searchInput.value) {
        const query = searchInput.value.value;
        if (query === "") {
          store.commit(MutationType.SetQuery, query);
          store.commit(MutationType.SetCurrentPage, 1);
          error.value = null;
        } else {
          try {
            const payload: QueryPayload = { query: query, page: 1 };
            await store.dispatch(ActionTypes.MakeQuery, payload);
            observe();
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
              store.commit(MutationType.SetQuery, "");
              store.commit(MutationType.SetCurrentPage, 1);
              error.value = null;
            }
          }
        }, 50);
      });
    };

    return {
      searchInput,
      searchResults,
      results,
      error,
      onChange,
      onClick,
      hasNextPage,
      lazyLoader,
      observer,
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
