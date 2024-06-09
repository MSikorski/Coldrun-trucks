<template>
  <UpdateTruckDialog />
  <DeleteTruckDialog />
  <div class="flex w-full p-3 max-h-full">
    <div class="w-80">
      <TrucksFilter />
    </div>
    <div class="ml-3 w-full max-h-full overflow-auto">
      <TrucksList />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapActions } from "vuex";
import TrucksFilter from './components/TrucksFilter.vue';
import TrucksList from './components/TrucksList.vue';
import UpdateTruckDialog from "./components/UpdateTruckDialog.vue";
import DeleteTruckDialog from "./components/DeleteTruckDialog.vue";
import { ACTION_FETCH_TRUCKS, MODULE_ID } from './constants';

export default defineComponent({
  name: 'TrucksPage',
  components: {
    UpdateTruckDialog,
    DeleteTruckDialog,
    TrucksFilter,
    TrucksList,
  },
  methods: {
    ...mapActions(MODULE_ID, [ACTION_FETCH_TRUCKS]),
  },
  mounted() {
    this.fetchTrucks();
  },
});
</script>
