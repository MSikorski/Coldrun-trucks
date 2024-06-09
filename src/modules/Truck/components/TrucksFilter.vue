<template>
  <Card class="shadow-xl">
    <template #title>Filter</template>
    <template #content>
      <Divider/>
      <FloatLabel class="mt-8">
        <InputText class="w-full" id="Code" v-model="trucksQuery.code" @input="debouncedSearch" />
        <label>Code</label>
      </FloatLabel>
      <Divider/>
      <FloatLabel class="mt-8">
        <InputText class="w-full" id="Name" v-model="trucksQuery.name" @input="debouncedSearch" />
        <label>Name</label>
      </FloatLabel>
      <Divider/>
      <FloatLabel class="mt-8">
        <InputText class="w-full" id="Name" v-model="trucksQuery.description" @input="debouncedSearch" />
        <label>Description</label>
      </FloatLabel>
      <Divider/>
      <FloatLabel class="mt-8">
        <Dropdown class="w-full" id="Status" option-label="label" option-value="value" :options="statusOptions"
                  v-model="trucksQuery.status" showClear @change="debouncedSearch" />
          <label>Status</label>
      </FloatLabel>
    </template>
  </Card>
  <Card class="mt-4 shadow-xl">
    <template #title>Sort</template>
    <template #content>
      <Divider/>
      <FloatLabel class="mt-8">
        <Dropdown class="w-full" id="OrderColumn" option-label="label" option-value="value" :options="orderColumnOptions"
                  v-model="trucksQuery.sort" showClear @change="debouncedSearch" />
          <label>Column</label>
      </FloatLabel>
      <Divider/>
      <FloatLabel class="mt-8">
        <Dropdown class="w-full" id="OrderColumn" option-label="label" option-value="value" :options="sortTypes"
                  v-model="trucksQuery.order" showClear @change="debouncedSearch" />
        <label>Sort type</label>
      </FloatLabel>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, useStore } from 'vuex';
import Card from 'primevue/card';
import FloatLabel from 'primevue/floatlabel';
import InputText from 'primevue/inputtext';
import Divider from 'primevue/divider';
import Dropdown from 'primevue/dropdown';
import debounce from 'lodash/debounce';
import { SORT_TYPES } from "@/constans";
import {
  MODULE_ID,
  TRUCK_STATUS_TO_LABEL,
  TRUCK_SORTABLE_COLUMN_TO_LABEL,
  ACTION_FETCH_TRUCKS,
} from '../constants'

export default defineComponent({
  name: 'TrucksFilter',
  components: {
    Card,
    FloatLabel,
    InputText,
    Divider,
    Dropdown,
  },
  computed: {
    ...mapGetters(MODULE_ID, ['trucksQuery'])
  },
  setup() {
    const statusOptions = Object.entries(TRUCK_STATUS_TO_LABEL).map(([value, label]) => ({ value, label }));
    const orderColumnOptions = Object.entries(TRUCK_SORTABLE_COLUMN_TO_LABEL).map(([value, label]) => ({ value, label }));
    const sortTypes = Object.entries(SORT_TYPES).map(([value, label]) => ({ value, label }));

    const store = useStore();
    const debouncedSearch = debounce(() => {
      store.dispatch(`${MODULE_ID}/${ACTION_FETCH_TRUCKS}`);
    }, 300);

    return {
      statusOptions,
      orderColumnOptions,
      sortTypes,
      debouncedSearch,
    };
  }
});
</script>
