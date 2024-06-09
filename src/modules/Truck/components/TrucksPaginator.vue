<template>
  <Paginator :template="template"
             :rows="trucksQuery.limit"
             :totalRecords="100"
             :page="trucksQuery.page"
             :rowsPerPageOptions="[10, 20, 50, 100]"
             @page="onPageChange"
  />
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from "vuex";
import Paginator, { PageState } from 'primevue/paginator';
import { MODULE_ID, ACTION_UPDATE_PAGINATION } from "../constants";

export default defineComponent({
  name: 'TrucksPaginator',
  components: {
    Paginator,
  },
  setup() {
    const store = useStore();

    const trucksQuery = computed(() => store.getters[`${MODULE_ID}/trucksQuery`]);

    const template = {
      '640px': 'PrevPageLink CurrentPageReport NextPageLink',
      '960px': 'FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink',
      '1300px': 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink',
      default: 'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink JumpToPageDropdown JumpToPageInput'
    };

    const onPageChange = (event: PageState) => {
      const pagination = {
        page: event.page + 1,
        limit: event.rows,
      };
      store.dispatch(`${MODULE_ID}/${ACTION_UPDATE_PAGINATION}`, pagination);
    };

    return {
      trucksQuery,
      template,
      onPageChange,
    };
  },
});
</script>
