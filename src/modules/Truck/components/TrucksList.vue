<template>
  <Card class="shadow-inner drop-shadow-2xl shadow-2xl">
    <template #title>
      <div class="flex space-between justify-between items-start">
        <div class="p-card-title">Trucks</div>
        <CreateTruckDialog />
      </div>
    </template>
    <template #content>
    <div class="relative w-full h-full">
      <div v-if="loading">
        <div class="absolute w-full h-full flex justify-center items-center">
          <ProgressSpinner class="absolute h-1/5 w-1/5 loader" />
        </div>
      </div>
      <div :class="{'overlay': loading}">
        <DataTable :value="trucks" responsiveLayout="scroll" >
          <Column field="code" header="Code"></Column>
          <Column field="name" header="Name"></Column>
          <Column field="description" header="Description"></Column>
          <Column field="status" header="Status">
            <template #body="slotProps">
              <StatusTag :status="slotProps.data.status" />
            </template>
          </Column>
          <Column header="Actions">
            <template #body="slotProps">
              <div class="flex">
                <Button icon="pi pi-pencil"
                        class="p-button-rounded p-button-info mr-2"
                        @click="showUpdateTruckModal(slotProps.data)"
                />
                <Button icon="pi pi-trash"
                        class="p-button-rounded p-button-danger"
                        @click="showDeleteTruckDialog(slotProps.data)"
                />
              </div>
            </template>
          </Column>
        </DataTable>
        <TrucksPaginator class="mt-4" />
      </div>
    </div>
    </template>
  </Card>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters, mapActions } from "vuex";
import Card from 'primevue/card';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import ProgressSpinner from 'primevue/progressspinner';
import StatusTag from "./StatusTag.vue";
import CreateTruckDialog from "./CreateTruckDialog.vue";
import TrucksPaginator from "./TrucksPaginator.vue";
import { ACTION_SHOW_DELETE_TRUCK_DIALOG, ACTION_SHOW_UPDATE_TRUCK_DIALOG, MODULE_ID } from "../constants";

export default defineComponent({
  name: 'TrucksList',
  components: {
    TrucksPaginator,
    Card,
    ProgressSpinner,
    CreateTruckDialog,
    DataTable,
    Column,
    Button,
    StatusTag,
  },
  computed: {
    ...mapGetters(MODULE_ID, ['trucks', 'loading']),
  },
  methods: {
    ...mapActions(MODULE_ID, [ACTION_SHOW_UPDATE_TRUCK_DIALOG, ACTION_SHOW_DELETE_TRUCK_DIALOG]),
  },
});
</script>
<style scoped>
  .overlay {
    opacity: 0.2;
  }
  .loader {
    z-index: 1200;
    top: 35%;
  }
</style>